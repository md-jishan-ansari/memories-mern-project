import React, { useState, useContext, useRef } from 'react';
import { Grid, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { TemplateContext } from '../../template/TemplateProvider';

import { addComment } from '../../redux/actions/postActions';

const useStyles = makeStyles((theme) => ({
  commentShowContainer: {
    height: 160,
    overflowY: 'auto',
  },
  commentCreateContainer: {
    '&>*': {
      marginBottom: 10,
    },
  },
}));

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const ctx = useContext(TemplateContext);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments);
  const dispatch = useDispatch();
  const commentRef = useRef();

  const commentHandler = async () => {
    const commentData = ctx?.user?.userData?.name + ': ' + comment;
    await dispatch(addComment(post._id, commentData));

    setComments([...comments, commentData]);
    setComment('');

    commentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Grid item xs={6} sm={4} md={6}>
        <Typography variant="h6" style={{ marginBottom: 10 }}>
          Comments
        </Typography>
        <Typography className={classes.commentShowContainer}>
          {comments?.map((comment) => (
            <Typography>
              <strong>{comment.split(':')[0]}</strong> {comment.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentRef} />
        </Typography>
      </Grid>
      <Grid item xs={6} sm={8} md={6} className={classes.commentCreateContainer}>
        <Typography variant="h6">Write a comment</Typography>
        {!ctx.user ? (
          <Typography>Please Signin to comment other Memories</Typography>
        ) : (
          <TextField
            variant="outlined"
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={(e) => {
              if (e.charCode === 13) commentHandler();
            }}
            fullWidth
            multiline
            rows="4"
          />
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!comment}
          onClick={commentHandler}
        >
          comment
        </Button>
      </Grid>
    </>
  );
};

export default CommentSection;
