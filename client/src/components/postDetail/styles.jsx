import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  detailContainer: {
    padding: 30,
  },

  discription: {
    paddingBottom: 15,
    '&>*': {
      marginTop: 5,
    },
  },

  //IMAGE

  image: {
    margin: 20,
    '&>*': {
      borderRadius: 20,
    },
  },

  loadingPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginBottom: 20,
    borderRadius: '15px',
    height: '39vh',
  },

  //SUGGESTION

  suggestionContainer: {
    display: 'flex',
    overflowX: 'auto',
    margin: 20,
  },
  suggestionCard: {
    margin: 20,
    minWidth: 200,
    maxWidth: 200,
    paddingBottom: 150,
    '&>*': {
      marginBottom: 5,
    },
  },
  buttonBase: {
    position: 'relative',
    display: 'block',
  },
  suggestionImage: {
    position: 'absolute',
    // transform: 'scale(.98)',
    bottom: 10,
  },
}));

export default useStyles;
