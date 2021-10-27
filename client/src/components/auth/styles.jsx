import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  authContainer: {
    width: 400,
    margin: '60px auto 20px',
  },
  authHeader: {
    textAlign: 'center',
    padding: '24px 0',
  },
  authLogo: {
    display: 'flex',
    backgroundColor: '#F50057',
    color: '#FFFFFF',
    borderRadius: '100%',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 10px',
  },
  formContainer: {
    position: 'relative',
    padding: '0 20px 50px',
    '&>*': {
      marginBottom: 15,
    },
  },
  switchButton: {
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
  googleButton: {
    // display: 'flex',
    '& first-child': {
      fontSize: 12,
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordLink: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStyles;
