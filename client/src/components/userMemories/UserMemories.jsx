import React, { useEffect, useContext } from 'react';
import { Grid, makeStyles, Paper, Typography, CircularProgress } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { getUserPosts } from '../../redux/actions/userActions';

import { TemplateContext } from '../../template/TemplateProvider';

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

const UserMemories = () => {
  const ctx = useContext(TemplateContext);
  const dispatch = useDispatch();
  const { isProgress } = useSelector((state) => state.posts);
  const { posts } = useSelector((state) => state.user.userPosts);

  const classes = useStyles();

  useEffect(() => {
    dispatch(getUserPosts(ctx?.user?.userData?._id));
  }, [ctx?.user?.userData?._id]);

  if (posts?.length === 0 || isProgress)
    return (
      <Paper className={classes.noPost} elevation={6}>
        {isProgress ? <CircularProgress /> : <Typography variant="h5">No Posts</Typography>}
      </Paper>
    );

  return (
    <>
      <Typography variant="h3" className={classes.heading}>
        Your Created Memories
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

export default UserMemories;
