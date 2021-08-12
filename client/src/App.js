import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Sets from './components/Sets/Sets';
import Set from './components/Sets/Set/Set';
import StudyingSet from './components/StudyingSet/StudyingSet';

const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/sets" exact component={Sets} />
        <Route path="/set/:setId" exact component={Set} />
        <Route path="/studying/set/:setId" exact component={StudyingSet} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;