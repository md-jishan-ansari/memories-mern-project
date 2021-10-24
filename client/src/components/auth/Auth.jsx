import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import { Paper, Box, Typography, Button, Grid } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import GoogleIcon from '@mui/icons-material/Google';
import { login, signup } from '../../redux/actions/userActions.js';

import useStyles from './styles';
import Input from './Input';

const initialUserData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [passwordType, setPasswordType] = useState('password');

  const setShowPassword = () => {
    if (passwordType === 'password') setPasswordType('text');
    else setPasswordType('password');
  };

  const history = useHistory();
  const dispatch = useDispatch();

  const ChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const switchHandler = () => {
    setUserData(initialUserData);
    setIsSignup(!isSignup);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup({ ...userData, name: userData.firstName + ' ' + userData.lastName }, history));
    } else {
      dispatch(login(userData, history));
    }
    setUserData(initialUserData);
  };

  const googleSuccess = async (res) => {
    dispatch({ type: 'AUTH', payload: { userData: res.profileObj, token: res.tokenId } });
    history.push('/');
  };

  const googleError = () => {
    console.log('Google Sign In was unsuccessful! Try again later');
  };

  return (
    <Paper component={Box} elevation={6} className={classes.authContainer}>
      <Box className={classes.authHeader}>
        <Box className={classes.authLogo}>
          <LockOutlined fontSize="medium" />
        </Box>
        <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
      </Box>
      <form className={classes.formContainer} onSubmit={submitHandler}>
        <Grid container spacing={2}>
          {isSignup && (
            <Fragment>
              <Input name="firstName" label="First Name" type="text" value={userData.firstName} ChangeHandler={ChangeHandler} half />
              <Input name="lastName" label="Last Name" type="text" value={userData.lastName} ChangeHandler={ChangeHandler} half />
            </Fragment>
          )}
          <Input name="email" label="Email Address" type="email" value={userData.email} ChangeHandler={ChangeHandler} />
          <Input
            name="password"
            label="Password"
            type={passwordType}
            value={userData.password}
            ChangeHandler={ChangeHandler}
            setShowPassword={setShowPassword}
          />
          {isSignup && (
            <Input name="confirmPassword" label="Confirm Password" type="password" value={userData.confirmPassword} ChangeHandler={ChangeHandler} />
          )}
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">
          {isSignup ? 'Sign up' : 'sign in'}
        </Button>

        <GoogleLogin
          clientId="26179719531-0i4v58bc6afmg2b2pjvlg1bd443e55u0.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              color="primary"
              fullWidth
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              variant="contained"
              className={classes.googleButton}
              startIcon={<GoogleIcon />}
            >
              Google Sign In
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy="single_host_origin"
        />

        <Button className={classes.switchButton} onClick={switchHandler}>
          {isSignup ? 'Already have an account? Sign In' : "don't Have an account? sign up"}
        </Button>
      </form>
    </Paper>
  );
};

export default Auth;
