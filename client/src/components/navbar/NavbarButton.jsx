import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useStyle from './styles';

import { Box, Button, Typography, Avatar, Menu, MenuItem } from '@material-ui/core';

import { TemplateContext } from '../../template/TemplateProvider';

const NavbarButton = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const ctx = useContext(TemplateContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    ctx.setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
    ctx.setUser(JSON.parse(localStorage.getItem('profile')));
  };

  return ctx.user ? (
    <Box className={classes.profileButton}>
      <Button
        onClick={logoutHandler}
        variant="contained"
        color="secondary"
        style={{ padding: '7px 20px', borderRadius: 20 }}
      >
        log out
      </Button>
      <Button onClick={handleClick} className={classes.userButton}>
        <Avatar className={classes.avatar}>{ctx.user?.userData?.name.charAt(0)}</Avatar>
        <Typography variant="h6">{ctx.user?.userData?.name.split(' ')[0]}</Typography>
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className={classes.menuContainer}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            history.push('/me');
            handleClose();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push('/myMemories');
            handleClose();
          }}
        >
          My Memories
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push('/savedMemories');
            handleClose();
          }}
        >
          Saved Memorie
        </MenuItem>
      </Menu>
    </Box>
  ) : (
    <Box className={classes.navbarButton}>
      <Button
        onClick={() => history.push('/user/login')}
        variant="contained"
        color="primary"
        className={classes.signinButton}
      >
        sign in
      </Button>

      <Button
        onClick={() => history.push('/user/signup')}
        variant="outlined"
        color="primary"
        className={classes.signinButton}
      >
        sign up
      </Button>
    </Box>
  );
};

export default NavbarButton;
