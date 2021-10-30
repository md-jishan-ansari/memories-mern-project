import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Paper, Box, Typography, Button, Grid } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

import useStyles from './styles';
import Input from './Input';

import { resetPassword } from '../../redux/actions/userActions.js';

const initialUserData = {
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const params = useParams();
  const classes = useStyles();

  const [userData, setUserData] = useState(initialUserData);
  const [passwordType, setPasswordType] = useState('password');

  const token = params.token;

  const setShowPassword = () => {
    if (passwordType === 'password') setPasswordType('text');
    else setPasswordType('password');
  };

  const history = useHistory();
  const dispatch = useDispatch();

  const ChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(resetPassword(userData, token, history));
    setUserData(initialUserData);
  };

  return (
    <Paper component={Box} elevation={6} className={classes.authContainer}>
      <Box className={classes.authHeader}>
        <Box className={classes.authLogo}>
          <LockOutlined fontSize="medium" />
        </Box>
        <Typography variant="h5">Reset Password</Typography>
      </Box>
      <form className={classes.formContainer} onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Input
            name="password"
            label="Password"
            type={passwordType}
            value={userData.password}
            ChangeHandler={ChangeHandler}
            setShowPassword={setShowPassword}
          />

          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={userData.confirmPassword}
            ChangeHandler={ChangeHandler}
          />
        </Grid>

        <Button type="submit" fullWidth variant="contained" color="primary">
          reset Password
        </Button>

        <Button className={classes.switchButton} onClick={() => history.push('/user/login')}>
          Back to login
        </Button>
      </form>
    </Paper>
  );
};

export default Auth;
