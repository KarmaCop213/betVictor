import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Sports from './sports';
import Events from './events';
import Outcomes from './outcomes';
import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/sports" exact component={Sports}></Route>
          <Route path="/sports/:sportId" exact component={Events}></Route>
          <Route path="/sports/:sportId/events/:eventId" exact component={Outcomes}></Route>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <Link to="/sports">Sports</Link>
  </div>
)




