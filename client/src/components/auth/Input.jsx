import React from 'react';
import { Grid } from '@material-ui/core';

import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const Input = ({ name, label, value, ChangeHandler, half, type, setShowPassword }) => {
  return (
    <Grid item xs={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        type={type}
        value={value}
        fullWidth
        variant="outlined"
        required
        onChange={ChangeHandler}
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={setShowPassword}>
                      {type === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
