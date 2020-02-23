import React from 'react';
import {
  Link,
  useRouteMatch
} from "react-router-dom";
import { getSports } from '../api/data';

function Sports() {
  const [route] = React.useState(useRouteMatch());
  const [sportsHtml, setSportsHtml] = React.useState([]);

  React.useEffect(() => {
    createSportsList();
  }, []);

  async function createSportsList() {
    const sports = await getSports();
    setSportsHtml(sports.sort((a, b) => a.pos - b.pos).map((item, i) => (
      <li key={i}>
        <a href={`${route.url}/${item.id}`}>{item.desc}</a>
      </li>
    )));
  }

  return (
    <div>
      <h2>Sports</h2>

      <ul>
        {sportsHtml}
      </ul>
    </div>
  );
}

export default Sports