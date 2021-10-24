import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Paper } from '@mui/material';
import { makeStyles } from '@material-ui/core';

import { getPosts } from '../redux/actions/postActions.js';

import Stack from '@mui/material/Stack';

const useStyles = makeStyles((theme) => ({
  paginateContainer: {
    maxWidth: 500,
    margin: '0 12px 20px',
    padding: theme.spacing(2),
  },
  paginate: {
    '&>*': {
      justifyContent: 'space-around',
    },
  },
}));

export default function PaginationControlled({ page }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { numberOfPages, isProgress } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts(page));
  }, [page]);

  const handleChange = (event, value) => {
    history.push(`/posts?page=${value}`);
  };

  return (
    !isProgress && (
      <Stack component={Paper} spacing={2} elevation={6} className={classes.paginateContainer}>
        <Pagination
          className={classes.paginate}
          count={numberOfPages}
          page={Number(page) || 1}
          onChange={handleChange}
        />
      </Stack>
    )
  );
}
