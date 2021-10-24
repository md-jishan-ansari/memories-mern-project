import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  postCard: {
    position: 'relative',
    borderRadius: '15px',
    height: '100%',
    paddingBottom: 40,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  overlay: {
    position: 'absolute',
    top: 15,
    left: 15,
    maxWidth: '70%',
    zIndex: 10,
    color: '#fff',
  },
  overlay2: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    color: '#fff',
  },
  titleHeading: {
    margin: '10px 0',
  },
  cardActions: {
    display: 'flex',
    position: 'absolute',
    bottom: 3,
    left: 2,
    right: 2,
    justifyContent: 'space-between',
    padding: '0 15px 10px 15px',
    marginTop: 'auto',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
}));

export default useStyles;
