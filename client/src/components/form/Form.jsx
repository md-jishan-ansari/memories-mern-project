import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { TemplateContext } from '../../template/TemplateProvider';

import useStyles from './styles';

import { createPost, updatePost } from '../../redux/actions/postActions.js';

const initialPostData = {
  title: '',
  message: '',
  tags: [],
  creater: '',
  createrName: '',
};

const Form = ({ currentId, setCurrentId }) => {
  const ctx = useContext(TemplateContext);
  const history = useHistory();
  const classes = useStyles();
  const [postData, setPostData] = useState(initialPostData);
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((post) => post._id === currentId) : null
  );

  const clear = () => {
    setCurrentId(0);
    setPostData({ ...initialPostData });
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const onChangeHandler = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleAddChip = (chip) => {
    console.log(chip);
    setPostData({ ...postData, tags: [...postData.tags, chip] });
  };

  const handleDeleteChip = (chip) => {
    console.log(chip);
    setPostData({ ...postData, tags: postData.tags.filter((c) => c !== chip) });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(post._id, postData, history));
      setCurrentId(0);
    } else {
      dispatch(
        createPost({
          ...postData,
          creater: ctx.user?.userData._id || ctx.user?.userData.googleId,
          createrName: ctx.user?.userData.name,
        })
      );
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
