import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Grid, Divider, Card, Hidden } from '@mui/material';
import { Button, TextField, InputAdornment, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { AccountCircle } from '@mui/icons-material';

import Input from '../auth/Input';
import { TemplateContext } from '../../template/TemplateProvider';
import { updateMe, updatePassword } from '../../redux/actions/userActions';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#ffffff',
    padding: '20px 0',
  },
  formContainer: {
    maxWidth: 500,
    position: 'relative',
    padding: '0 20px 80px',
    margin: '50px auto',
    [theme.breakpoints.up('md')]: {
      margin: '100px auto',
    },
  },
  formHeading: {
    paddingBottom: 30,
    color: 'primary',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 30,
    fontFamily: "'Lato', sans-serif",
    color: '#fff',
    borderRadius: 100,
    padding: '10px 50px',
  },

  avatar: {
    height: 75,
    width: 75,
    marginRight: 20,
  },
  photoInput: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const initialPasswordData = {
  passwordCurrent: '',
  password: '',
  confirmPassword: '',
};

export default function UserProfileData() {
  const ctx = useContext(TemplateContext);

  const [passwordData, setPasswordData] = useState(initialPasswordData);
  const [userData, setUserData] = useState({
    firstName: ctx?.user?.userData?.firstName,
    lastName: ctx?.user?.userData?.lastName,
    email: ctx?.user?.userData?.email,
    userImage: ctx?.user?.userData?.userImage,
  });
  const [image, setImage] = useState(
    ctx?.user?.userData?.userImage && ctx?.user?.userData?.userImage
  );

  const [passwordType, setPasswordType] = useState('password');
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleUserChange = (e) => {
    if (e.target.name === 'userImage') {
      setUserData({ ...userData, [e.target.name]: e.target.files[0] });
      setImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const submitUserDataHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let x in userData) {
      formData.append(x, userData[x]);
    }
    dispatch(updateMe(formData));
    window.location.reload();
  };

  const submitUpdatedPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(passwordData));
    setPasswordData(initialPasswordData);
  };

  return (
    <Grid container className={classes.container} elevation={6} component={Card}>
      <Grid item md={6} xs={12}>
        <>
          <form onSubmit={submitUserDataHandler} className={classes.formContainer}>
            <Typography variant="h5" className={classes.formHeading}>
              YOUR ACCOUNT SETTINGS
            </Typography>
            <Grid container spacing={2}>
              <Input
                name="firstName"
                label="First Name"
                half
                value={userData.firstName}
                type="text"
                ChangeHandler={handleUserChange}
              />
              <Input
                name="lastName"
                label="Last Name"
                half
                value={userData.lastName}
                type="text"
                ChangeHandler={handleUserChange}
              />
              <Input
                name="email"
                label="Your Email"
                value={userData.email}
                type="text"
                ChangeHandler={handleUserChange}
              />
              <Grid item className={classes.photoInput}>
                <Avatar className={classes.avatar} src={image} />
                <TextField
                  id="input-with-icon-textfield"
                  type="file"
                  name="userImage"
                  label="Choose new photo"
                  size="medium"
                  variant="standard"
                  fullWidth
                  onChange={handleUserChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              save settings
            </Button>
          </form>
          <Hidden mdUp>
            <Divider />
          </Hidden>
        </>
      </Grid>

      <Grid item md={6} xs={12}>
        <form onSubmit={submitUpdatedPasswordHandler} className={classes.formContainer}>
          <Typography variant="h5" className={classes.formHeading}>
            PASSWORD CHANGE
          </Typography>
          <Grid container spacing={2}>
            <Input
              name="passwordCurrent"
              label="Current password"
              value={passwordData.passwordCurrent}
              type="password"
              ChangeHandler={handlePasswordChange}
            />
            <Input
              name="password"
              label="Password"
              value={passwordData.password}
              type={passwordType}
              setPasswordType={setPasswordType}
              ChangeHandler={handlePasswordChange}
            />

            <Input
              name="confirmPassword"
              label="Confirm Password"
              value={passwordData.confirmPassword}
              type="password"
              ChangeHandler={handlePasswordChange}
            />
          </Grid>
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
            save password
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
