import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appbar: {
    height: 85,
    justifyContent: 'center',
    margin: '30px 0px',
    borderRadius: '15px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
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
  },
  avatar: {
    backgroundColor: 'purple',
  },
  menuContainer: {
    marginTop: 50,
  },
}));

export default useStyles;
