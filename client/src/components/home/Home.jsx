import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, makeStyles, Paper, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import Posts from '../posts/Posts';
import Form from '../form/Form';
import Pagination from '../Pagination';

import { getPostBySearch } from '../../redux/actions/postActions';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  searchContainer: {
    padding: '20px 20px 10px 20px',
    margin: '0 12px 15px 12px',
    '&>*': {
      marginBottom: 15,
    },
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const query = useQuery();

  const dispatch = useDispatch();

  const searchQuery = query.get('search');
  const tagsQuery = query.get('tags');

  const page = query.get('page') || 1;

  useEffect(() => {
    if (searchQuery || tagsQuery) {
      dispatch(getPostBySearch(searchQuery, tagsQuery));
    }
  }, [query]);

  const searchHandler = () => {
    history.push(`/posts/search?search=${search || 'none'}&tags=${tags.join(',') || 'none'}`);
    setSearch('');
    setTags([]);
  };

  const keyPressHandler = (e) => {
    if (e.charCode === 13) searchHandler();
  };

  const handleAddChip = (chip) => {
    setTags([...tags, chip]);
  };

  const handleDeleteChip = (chip) => {
    setTags(tags.filter((tag) => tag !== chip));
  };

  return (
    <Grid container className={classes.container}>
      <Grid item md={9} sm={6} xs={12}>
        <Posts setCurrentId={setCurrentId} />
        {!(searchQuery || tagsQuery) && <Pagination page={page} />}
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Paper className={classes.searchContainer} elevation={6}>
          <TextField
            name="searchMemories"
            value={search}
            onKeyPress={keyPressHandler}
            onChange={(e) => setSearch(e.target.value)}
            label="Search Memories"
            variant="outlined"
            fullWidth
          />
          <ChipInput
            name="searchTags"
            label="Tags"
            fullWidth
            value={tags}
            variant="outlined"
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
          <Button
            variant="contained"
            onClick={searchHandler}
            color="primary"
            type="submit"
            disabled={!search && !tags.length}
            fullWidth
          >
            search
          </Button>
        </Paper>
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </Grid>
    </Grid>
  );
};

export default Home;
