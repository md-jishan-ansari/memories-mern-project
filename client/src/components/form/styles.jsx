import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: theme.spacing(3),
    margin: '0 12px 15px',
  },
  form: {
    '&> *': {
      marginTop: 15,
    },
  },
  heading: {
    textAlign: 'center',
    marginTop: 0,
    fontSize: 20,
  },
}));

export default useStyles;
