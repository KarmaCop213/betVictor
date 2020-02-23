import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Sports from './components/sports';
import Events from './components/events';
import Outcomes from './components/outcomes';
import './App.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/sports" exact component={Sports}></Route>
        <Route path="/sports/:sportId" exact component={Events}></Route>
        <Route path="/sports/:sportId/events/:eventId" exact component={Outcomes}></Route>
      </Switch>
    </Router>
  );
}

const Home = () => (
  <div>
    <a href="/sports">Sports</a>
  </div>
)




