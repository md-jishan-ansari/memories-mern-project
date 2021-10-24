import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import {
  Box,
  Button,
  ButtonBase,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@material-ui/core';

import moment from 'moment';
import { MoreHoriz, ThumbUpAltOutlined, ThumbUpAlt, Delete } from '@material-ui/icons';
import useStyles from './styles';
import { deletePost, likePost } from '../../../redux/actions/postActions.js';

import { TemplateContext } from '../../../template/TemplateProvider';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const ctx = useContext(TemplateContext);
  const [likes, setLikes] = useState(post.likes);
  const history = useHistory();
  const dispatch = useDispatch();

  const userId = ctx?.user?.userData?._id || ctx?.user?.userData?.googleId;
  // const hashLikedPost = post?.likes?.find((like) => like === userId);

  const isPostCreatedByUser = userId && userId === post.creater;

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  const clickUpdateHandler = () => {
    setCurrentId(post._id);
  };

  const clickHandler = () => {
    dispatch(deletePost(post._id));
  };

  const likeHandler = () => {
    dispatch(likePost({ postId: post._id, userId }));
    const hashLikedPost = likes?.find((like) => like === userId);

    if (hashLikedPost) {
      setLikes(post.likes.filter((like) => like !== userId));
    } else {
      console.log('not liked');
      setLikes([...post?.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card elevation={6} className={classes.postCard}>
      <Box className={classes.overlay}>
        <Typography variant="h6">{post.createrName}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </Box>
      {isPostCreatedByUser && (
        <Button size="small" className={classes.overlay2} onClick={clickUpdateHandler}>
          <MoreHoriz />
        </Button>
      )}

      <ButtonBase component="span" name="test" onClick={openPost} className={classes.cardAction}>
        <CardMedia
          className={classes.media}
          image={
            // 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            '/img/tree.jpg'
          }
          title={'eid'}
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>

          <Typography variant="h5" className={classes.titleHeading}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!userId} onClick={likeHandler}>
          <Likes />
        </Button>
        {isPostCreatedByUser && (
          <Button size="small" color="secondary" onClick={clickHandler}>
            <Delete />
            &nbsp;delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
