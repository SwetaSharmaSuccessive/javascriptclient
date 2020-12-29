import React from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import {
  Trainee, Login, NoMatch, ChildrenDemo, InputDemo, TextFieldDemo,
} from './pages/index';

import { AuthRoute, PrivateRoute } from './routes/index';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/trainee" />
          </Route>
          <AuthRoute path="/login" component={Login} />
          <PrivateRoute path="/text-field" component={TextFieldDemo} />
          <PrivateRoute path="/inputDemo" component={InputDemo} />
          <PrivateRoute path="/childrenDemo" component={ChildrenDemo} />
          <PrivateRoute path="/trainee" component={Trainee} />
          <PrivateRoute component={NoMatch} />
        </Switch>
      </Router>
    </>
  );
}
export default App;
