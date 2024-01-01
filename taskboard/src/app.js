import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskBoard from './taskboard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={TaskBoard} />
      </Switch>
    </Router>
  );
};

export default App;
