import React from 'react';
import {
  Link,
  useRouteMatch
} from "react-router-dom";

function Sports() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Sports</h2>

      <ul>
        <li>
          <Link to={`${match.url}/1`}>Sport 1</Link>
        </li>
        <li>
          <Link to={`${match.url}/2`}>Sport 2</Link>
        </li>
        <li>
          <Link to={`${match.url}/3`}>Sport 3</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sports