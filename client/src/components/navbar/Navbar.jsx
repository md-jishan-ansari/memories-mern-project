import React, { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Box } from '@material-ui/core';

import NavbarButton from './NavbarButton';

// import { logout } from '../../redux/actions/userActions';

import useStyles from './styles';

const Navbar = () => {
  const classes = useStyles();

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
    </AppBar>
  );
};

export default Navbar;
