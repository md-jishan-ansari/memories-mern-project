import React from 'react';
import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: '10px 0 10px 20px',
  },
  listIcon: {
    color: '#ffffff',
    fontWeight: '100',
  },
  text: {
    '&>*': {
      color: '#ffffff',
      fontFamily: "'Lato', sans-serif",
    },
  },
}));

const ListItemComponent = ({ icon, text, currentIndex, setIndex, index }) => {
  const classes = useStyles();
  return (
    <ListItem
      button
      selected={index === currentIndex}
      className={classes.listItem}
      onClick={() => setIndex(index)}
    >
      <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>
      <ListItemText className={classes.text} primary={text} />
    </ListItem>
  );
};

export default ListItemComponent;
