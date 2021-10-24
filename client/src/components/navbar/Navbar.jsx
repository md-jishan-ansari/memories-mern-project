import React, { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Hidden,
} from '@material-ui/core';
import { TemplateContext } from '../../template/TemplateProvider';

// import { logout } from '../../redux/actions/userActions';

import useStyles from './styles';

const Navbar = () => {
  const ctx = useContext(TemplateContext);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    ctx.setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
    ctx.setUser(JSON.parse(localStorage.getItem('profile')));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.appbar} color="inherit">
      <Toolbar>
        <Box component={Link} to="/posts" className={classes.logo}>
          <Box className={classes.imgText}>
            <img src="/img/memoriesText.png" alt="memoriesText" />
          </Box>
          <Box className={classes.imgLogo}>
            <img src="/img/memoriesLogo.png" alt="memoriesLogo" />
          </Box>
        </Box>
        {ctx.user ? (
          <>
            <Box className={classes.profileButton}>
              <Hidden mdUp>
                <Avatar
                  className={classes.avatar}
                  style={{ cursor: 'pointer' }}
                  onClick={handleClick}
                >
                  {ctx.user?.userData?.name.charAt(0)}
                </Avatar>
              </Hidden>
              <Hidden smDown>
                <Avatar className={classes.avatar}>{ctx.user?.userData?.name.charAt(0)}</Avatar>
                <Typography variant="h6">{ctx.user?.userData?.name}</Typography>
                <Button onClick={logoutHandler} variant="contained" color="secondary">
                  log out
                </Button>
              </Hidden>
            </Box>

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
                  handleClose();
                  logoutHandler();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
            className={classes.signinButton}
          >
            sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
