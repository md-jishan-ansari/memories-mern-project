import React, { useEffect, useContext, useState } from 'react';
import { Grid, makeStyles, Paper, Typography, CircularProgress } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
// import { getUserPosts } from '../../redux/actions/postActions';

// import { TemplateContext } from '../../template/TemplateProvider';

import Post from '../posts/post/Post';
import Form from '../form/Form';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
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
  // const ctx = useContext(TemplateContext);
  const [currentId, setCurrentId] = useState(0);
  // const dispatch = useDispatch();
  const { isProgress, userPosts } = useSelector((state) => state.posts);

  const classes = useStyles();

  // useEffect(() => {
  //   dispatch(getUserPosts(ctx?.user?.userData?._id));
  // }, [ctx?.user?.userData?._id]);

  return (
    <>
      <Typography variant="h3" className={classes.heading}>
        Your Created Memories
      </Typography>
      <Grid container className={classes.mainContainer}>
        <Grid item md={9} sm={6} xs={12}>
          {userPosts?.length === 0 || isProgress ? (
            <Paper className={classes.noPost} elevation={6}>
              {isProgress ? (
                <CircularProgress />
              ) : (
                <Typography variant="h4" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  You don't have any created memories yet
                </Typography>
              )}
            </Paper>
          ) : (
            <Grid container spacing={3} className={classes.container}>
              {userPosts?.map((post) => (
                <Grid item xs={12} sm={12} md={6} lg={3} key={post._id}>
                  <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Grid>
    </>
  );
};

export default UserMemories;
