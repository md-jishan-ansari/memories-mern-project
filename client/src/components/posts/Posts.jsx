import React from 'react';
import { Grid, makeStyles, Paper, Typography, CircularProgress } from '@material-ui/core';

import { useSelector } from 'react-redux';

import Post from './post/Post';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '0 12px 24px 12px',
  },
  noPost: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginBottom: 20,
    borderRadius: '15px',
    height: '39vh',
  },
}));

const Posts = ({ setCurrentId }) => {
  const { posts, isProgress } = useSelector((state) => state.posts);

  const classes = useStyles();

  if (posts?.length === 0 || isProgress)
    return (
      <Paper className={classes.noPost} elevation={6}>
        {isProgress ? <CircularProgress /> : <Typography variant="h5">No Posts</Typography>}
      </Paper>
    );

  return (
    <Grid container spacing={3} className={classes.container}>
      {posts?.map((post) => (
        <Grid item xs={12} sm={12} md={6} lg={3} key={post._id}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
