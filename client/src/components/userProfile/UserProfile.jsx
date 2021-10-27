import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Grid, Divider, Card, Hidden } from '@mui/material';
import { Button, TextField, InputAdornment, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { AccountCircle } from '@mui/icons-material';

import Input from '../auth/Input';
import { TemplateContext } from '../../template/TemplateProvider';
// import { updateUser, updatePassword } from '../../redux/actions/authanticationAction';

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
  passwordConfirm: '',
};

export default function UserProfileData() {
  const ctx = useContext(TemplateContext);

  const [passwordData, setPasswordData] = useState(initialPasswordData);
  const [userData, setUserData] = useState({
    name: ctx?.user?.userData?.name,
    email: ctx?.user?.userData?.email,
    photo: null,
  });
  const [image, setImage] = useState(
    ctx?.user?.userData?.photo && `/img/users/${ctx?.user?.userData?.photo}`
  );
  console.log(ctx?.user?.userData?.photo, image);

  const [passwordType, setPasswordType] = useState('password');
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleUserChange = (e) => {
    if (e.target.name === 'photo') {
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

    // dispatch(updateUser(formData));

    // ctx.userData.data.user.name = userData.name;
    // ctx.setUserData({ ...ctx.userData });
  };

  const submitUpdatedPasswordHandler = (e) => {
    e.preventDefault();
    // dispatch(updatePassword(passwordData));
    // setPasswordData(initialPasswordData);
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
                name="name"
                label="Your Name"
                value={userData.name}
                type="text"
                handleChange={handleUserChange}
              />
              <Input
                name="email"
                label="Your Email"
                value={userData.email}
                type="text"
                handleChange={handleUserChange}
              />
              <Grid item className={classes.photoInput}>
                <Avatar className={classes.avatar} src={image} />
                <TextField
                  id="input-with-icon-textfield"
                  type="file"
                  name="photo"
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
              value={userData.currentPassword}
              type="password"
              handleChange={handlePasswordChange}
            />
            <Input
              name="password"
              label="Password"
              value={userData.password}
              type={passwordType}
              setPasswordType={setPasswordType}
              handleChange={handlePasswordChange}
            />

            <Input
              name="passwordConfirm"
              label="Confirm Password"
              value={userData.passwordConfirm}
              type="password"
              handleChange={handlePasswordChange}
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
