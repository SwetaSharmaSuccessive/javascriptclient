import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-components';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import {
  Trainee, Login, NoMatch, ChildrenDemo, InputDemo, TextFieldDemo,
} from './pages/index';
import apolloClient from './libs/apollo-client';
import { AuthRoute, PrivateRoute } from './routes/index';
import { SnackBarProvider } from './contexts/SnackBarProvider';

function App() {
  return (
    <>
      <CssBaseline />
      <SnackBarProvider>
        <Router>
          <ApolloProvider client={apolloClient}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <AuthRoute path="/login" component={Login} />
              <PrivateRoute path="/text-field" component={TextFieldDemo} />
              <PrivateRoute path="/inputDemo" component={InputDemo} />
              <PrivateRoute path="/childrenDemo" component={ChildrenDemo} />
              <PrivateRoute path="/trainee" component={Trainee} />
              <AuthRoute component={NoMatch} />
            </Switch>
          </ApolloProvider>
        </Router>
      </SnackBarProvider>
    </>
  );
}
export default App;
