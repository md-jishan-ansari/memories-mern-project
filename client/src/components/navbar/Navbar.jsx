import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Box } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { TemplateContext } from '../../template/TemplateProvider';

import { getSavedPosts, getUserPosts } from '../../redux/actions/postActions';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavbarButton from './NavbarButton';

import useStyles from './styles';

const Navbar = () => {
  const classes = useStyles();

  const ctx = useContext(TemplateContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ctx?.user) {
      dispatch(getSavedPosts(ctx?.user?.userData?._id));
      dispatch(getUserPosts(ctx?.user?.userData?._id));
    }
  }, [ctx?.user]);

  return (
    <AppBar position="static" className={classes.appbar} color="inherit">
      <Toolbar className={classes.toolbar}>
        <Box component={Link} to="/posts" className={classes.logo}>
          <Box className={classes.imgText}>
            <img src="/img/memoriesText.png" alt="memoriesText" />
          </Box>
          <Box className={classes.imgLogo}>
            <img src="/img/memoriesLogo.png" alt="memoriesLogo" />
          </Box>
        </Box>
        <NavbarButton />
      </Toolbar>
      <ToastContainer />
    </AppBar>
  );
};

export default Navbar;
