import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Card, Box, Typography, Grid, ButtonBase } from '@material-ui/core';

import useStyles from './styles';

const SuggestionCard = ({ id }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts.posts.filter((post) => post._id !== id));
  const history = useHistory();

  const openPost = (id) => {
    history.push(`/posts/${id}`);
  };

  return (
    <Grid item className={classes.suggestionContainer}>
      {posts.map((post) => (
        <ButtonBase
          key={post._id}
          component="span"
          onClick={() => openPost(post._id)}
          className={classes.buttonBase}
        >
          <Card className={classes.suggestionCard} elevation={0}>
            <Typography variant="h5">{post.title}</Typography>
            <Typography>{post.createrName}</Typography>
            <Typography variant="body2" style={{ lineHeight: 1.2 }} color="textSecondary">
              {post.message}
            </Typography>
            <Typography>Likes: {post.likes.length}</Typography>
            <Box className={classes.suggestionImage}>
              <img src={post.postImage} alt="suggetion" />
            </Box>
          </Card>
        </ButtonBase>
      ))}
    </Grid>
  );
};

export default SuggestionCard;
