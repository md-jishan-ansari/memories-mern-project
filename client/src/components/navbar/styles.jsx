import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appbar: {
    minHeight: 85,
    justifyContent: 'center',
    margin: '30px 0px',
    borderRadius: '15px',
  },
  toolbar: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: '10px 0',
    },
  },
  imgText: {
    width: 200,
    marginLeft: 25,
  },
  imgLogo: {
    width: 40,
    margin: '3px 0 0 10px',
  },
  signinButton: {
    margin: '0 25px 0 auto',
  },
  profileButton: {
    display: 'flex',
    margin: '0 10px 0 auto',
    alignItems: 'center',
    justifyContent: 'center',
    '&>*': {
      marginLeft: 10,
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0 0 10px 0',
    },
  },
  avatar: {
    backgroundColor: 'purple',
    marginRight: 5,
  },
  userButton: {
    padding: '1px 10px',
    borderRadius: '20px',
  },
  menuContainer: {
    // marginTop: 50,
    margin: '50px 50px 0 0',
    transform: 'translateX(-14px)',
  },
  navbarButton: {
    display: 'flex',
    margin: '0 10px 0 auto',
    '&>*': {
      margin: '0 0 0 16px',
      padding: '7px 23px',
      borderRadius: '20px',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0 0 10px 0',
    },
  },
}));

export default useStyles;
