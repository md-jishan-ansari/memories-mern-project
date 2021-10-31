import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Grid, Typography, Box, Paper, Divider, CircularProgress } from '@material-ui/core';
import useStyles from './styles';

import { getPost, getPostBySearch } from '../../redux/actions/postActions';

import SuggestionCard from './SuggestionCard';
import CommentSection from './CommentSection';

const PostDetail = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();

  const { post, isProgress } = useSelector((state) => state.posts);

  useEffect(() => {
    const tags = post?.tags;
    if (tags) dispatch(getPostBySearch('none', tags.join(',')));
  }, [post]);

  useEffect(() => {
    dispatch(getPost(params.id));
  }, [params.id]);

  if (isProgress) {
    return (
      <Paper elevation={6} className={classes.loadingPage}>
        <CircularProgress />
      </Paper>
    );
  }

  return post ? (
    <Paper elevation={6} component={Box}>
      <Grid container>
        <Grid item lg={4} md={5} xs={12} className={classes.detailContainer}>
          <Box className={classes.discription}>
            <Typography variant="h3">{post.title}</Typography>
            <Typography style={{ fontSize: 20 }} color="primary">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography>{post.message}</Typography>
            <Typography style={{ fontSize: 22 }}>
              Created by:{' '}
              <Typography variant="span" color="primary">
                {post.createrName}
              </Typography>
            </Typography>
            <Typography>{moment(post.createdAt).fromNow()}</Typography>
          </Box>
          <Divider />
          <Box style={{ padding: '15px 0' }}>
            <Typography variant="h6">Realtime Chat - comming soon!</Typography>
          </Box>
          <Divider />
          <Grid container style={{ padding: '15px 0' }} spacing={2}>
            <CommentSection post={post} />
          </Grid>
          <Divider />
        </Grid>

        <Grid item lg={8} md={7}>
          <Box className={classes.image}>
            <img src={post.postImage} alt="memories Pic" />
          </Box>
        </Grid>

        <Grid item xs={12} style={{ margin: '0 30px' }}>
          <Typography variant="h5" style={{ paddingBottom: '10px' }}>
            You might also like:
          </Typography>
          <Divider />
        </Grid>

        <SuggestionCard id={post._id} />
      </Grid>
    </Paper>
  ) : (
    <Paper>Wait for post</Paper>
  );
};

export default PostDetail;
