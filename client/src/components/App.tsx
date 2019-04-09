import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';

import AppBar from './navigation/AppBar';
import LandingPage from '../pages/LandingPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';

import { configureStore } from '../store';

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757de8',
      main: '#3f51b5',
      dark: '#002984',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffff55',
      main: '#ffe400',
      dark: '#c7b200',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component 
{
  render() 
  {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Provider store={store}>
            <AppBar />
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route exact path='/login' component={SignInPage} />
              <Route exact path='/join' component={SignUpPage} />
            </Switch>
          </Provider>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
