import React from 'react';
import { Grid, makeStyles, Paper, Typography, CircularProgress } from '@material-ui/core';

import { useSelector } from 'react-redux';

import Post from '../posts/post/Post';

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
  heading: {
    textAlign: 'center',
    margin: '0px 10px 20px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px #808080',
    border: '1px solid #808080',
    borderRadius: '10px',
  },
}));

const SavedMemories = () => {
  const { posts, isProgress } = useSelector((state) => state.posts);

  const classes = useStyles();

  if (posts?.length === 0 || isProgress)
    return (
      <Paper className={classes.noPost} elevation={6}>
        {isProgress ? <CircularProgress /> : <Typography variant="h5">No Posts</Typography>}
      </Paper>
    );

  return (
    <>
      <Typography variant="h3" className={classes.heading}>
        Your Saved Memories
      </Typography>
      <Grid container spacing={3} className={classes.container}>
        {posts?.map((post) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={post._id}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SavedMemories;
