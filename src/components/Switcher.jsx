import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Trivia from '../pages/Trivia';
import Settings from '../pages/Settings';
import Feedback from '../pages/Feedback';
import Ranking from '../pages/Ranking';

class Switcher extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/trivia" render={ (props) => <Trivia { ...props } /> } />
        <Route exact path="/settings" render={ (props) => <Settings { ...props } /> } />
        <Route exact path="/feedback" render={ (props) => <Feedback { ...props } /> } />
        <Route exact path="/ranking" render={ (props) => <Ranking { ...props } /> } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
    );
  }
}

export default Switcher;
