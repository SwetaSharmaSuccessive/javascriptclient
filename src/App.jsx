import React from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router, Route, Switch,
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
            <PrivateRoute component={Trainee} />
          </Route>
          <AuthRoute path="/login" component={Login} />
          <PrivateRoute path="/text-field" component={TextFieldDemo} />
          <PrivateRoute path="/inputDemo" component={InputDemo} />
          <PrivateRoute path="/childrenDemo" component={ChildrenDemo} />
          <PrivateRoute component={NoMatch} />
        </Switch>
      </Router>
    </>
  );
}
export default App;
