import React from 'react';
import TablePages from './table/TablePage';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import FormDeclaration from './form/FormDeclaration';
import { ThemeProvider, createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    success: {
      main: '#198754',
      light: '#4caf50',
    },

    info: {
      main: '#777',
    },

    warning: {
      main: '#FFC107',
      light: 'rgba(255, 193, 7, 0.8)',
      dark: '#FFC107',
    },
  },

  typography: {
    fontFamily: 'Roboto',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h2: {
      fontWeight: 500,
    },

    button: {
      fontSize: '1.6rem',
      textTransform: 'capitalize',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/table" />
          </Route>
          <Route exact path="/table">
            <TablePages />
          </Route>
          <Route exact path="/form">
            <FormDeclaration />
          </Route>
          <Route exact path="/form/:id">
            <FormDeclaration />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
