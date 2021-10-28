import { createContext, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

export const TemplateContext = createContext({
  user: null,
  setUser: null,
  currentId: 0,
  setCurrentId: null,
});

const TemplateProvider = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [currentId, setCurrentId] = useState(0);

  const theme = createTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          img: {
            objectFit: 'cover',
            width: '100%',
            height: 'auto',
          },
          a: {
            textDecoration: 'none',
            paddingRight: 3,
          },
        },
      },
    },
  });

  return (
    <TemplateContext.Provider
      value={{ user: user, setUser: setUser, currentId: currentId, setCurrentId: setCurrentId }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;
