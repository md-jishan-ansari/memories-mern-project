import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, TextField, Button, InputAdornment } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { TemplateContext } from '../../template/TemplateProvider';

import ImageIcon from '@mui/icons-material/Image';

import useStyles from './styles';

import { createPost, updatePost } from '../../redux/actions/postActions.js';

const Form = ({ currentId, setCurrentId }) => {
  const ctx = useContext(TemplateContext);
  const history = useHistory();
  const classes = useStyles();

  const initialPostData = {
    title: '',
    message: '',
    tags: [],
    creater: ctx.user?.userData._id,
    createrName: ctx.user?.userData.name,
    postImage: null,
  };

  const [postData, setPostData] = useState(initialPostData);
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    currentId ? state.posts.userPosts.find((post) => post._id === currentId) : null
  );

  const clear = () => {
    setCurrentId(0);
    setPostData({ ...initialPostData });
  };

  useEffect(() => {
    if (post) {
      setPostData({
        title: post.title,
        message: post.message,
        tags: post.tags,
        postImage: post.postImage,
      });
    }
  }, [post]);

  const onChangeHandler = (e) => {
    if (e.target.name === 'postImage')
      setPostData({ ...postData, [e.target.name]: e.target.files[0] });
    else setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleAddChip = (chip) => {
    // console.log(chip);
    setPostData({ ...postData, tags: [...postData.tags, chip] });
  };

  const handleDeleteChip = (chip) => {
    // console.log(chip);
    setPostData({ ...postData, tags: postData.tags.filter((c) => c !== chip) });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let x in postData) {
      if (x === 'tags') {
        postData[x].forEach((item) => formData.append('tags[]', item));
      } else formData.append(x, postData[x]);
    }

    if (currentId) {
      dispatch(updatePost(post._id, formData));
      setCurrentId(0);
    } else {
      dispatch(createPost(formData));
    }
    clear();
  };

  return (
    <>
      {!ctx.user ? (
        <Paper className={classes.formContainer} elevation={6}>
          <Typography variant="h5">
            Please Signin to create your own Memories, like other memories
          </Typography>
        </Paper>
      ) : (
        <Paper className={classes.formContainer} elevation={6}>
          <form onSubmit={submitHandler} className={classes.form}>
            <Typography className={classes.heading}>
              {currentId ? `Updating ${post.title}` : 'Creating a Memory'}
            </Typography>
            <TextField
              name="title"
              label="Title"
              value={postData.title}
              onChange={onChangeHandler}
              variant="outlined"
              fullWidth
            />
            <TextField
              name="message"
              label="Message"
              value={postData.message}
              onChange={onChangeHandler}
              variant="outlined"
              fullWidth
              multiline={true}
              rows="4"
            />

            <ChipInput
              name="tags"
              label="Tags"
              fullWidth
              value={postData.tags}
              variant="outlined"
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
            />

            <TextField
              name="postImage"
              label="Choose an Image"
              type="file"
              onChange={onChangeHandler}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ImageIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {currentId ? 'Update' : 'Create'}
            </Button>
            <Button variant="contained" color="secondary" onClick={clear} fullWidth>
              clear
            </Button>
          </form>
        </Paper>
      )}
    </>
  );
};

export default Form;
