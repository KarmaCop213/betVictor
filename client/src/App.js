import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LocalizedStrings from 'react-localization';
import Sports from './components/sports';
import Events from './components/events';
import Outcomes from './components/outcomes';
import './App.css';

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect from="/*" to="/sports" />
          </Route>
          <Route path="/sports" exact component={Sports}></Route>
          <Route path="/sports/:sportId" exact component={Events}></Route>
          <Route path="/sports/:sportId/events/:eventId" exact component={Outcomes}></Route>
        </Switch>
      </Router >
    </div >
  );
}





