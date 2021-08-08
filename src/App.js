import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components

import Login from './components/login';
import Signup from './components/signup';

// Screens

import Categories from './screens/categories';
import Psychics from './screens/psychics';

function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/psychics" name="Psychics" component={Psychics} />
        <Route exact path="/categories" name="Categories" component={Categories} />

        <Route exact path="/(|login)" name="Login" component={Login} />
        <Route exact path="/signup" name="Signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
