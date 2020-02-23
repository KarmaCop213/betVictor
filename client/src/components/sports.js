import React from 'react';
import {
  Link,
  useRouteMatch
} from "react-router-dom";
import { getSports } from '../api/data';

function Sports() {
  const [route, setRoute] = React.useState(useRouteMatch());
  const [sportsHtml, setSportsHtml] = React.useState([]);

  React.useEffect(() => {
    createSportsList();
  }, []);

  async function createSportsList() {
    const sports = await getSports();
    setSportsHtml(sports.map((item, i) => (
      <li key={i}>
        <Link to={`${route.url}/${item.id}`}>{item.desc}</Link>
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