import React from 'react';
import {
  Link,
  useRouteMatch
} from "react-router-dom";

function Events() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Events for sportId {match.params.sportId}</h2>

      <ul>
        <li>
          <Link to={`${match.url}/events/1`}>Event 1</Link>
        </li>
        <li>
          <Link to={`${match.url}/events/2`}>Event 2</Link>
        </li>
        <li>
          <Link to={`${match.url}/events/3`}>Event 3</Link>
        </li>
      </ul>
    </div>
  );
}


export default Events;