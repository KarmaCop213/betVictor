import React from 'react';
import {
  useRouteMatch
} from "react-router-dom";
import { getSports } from '../api/data';
import { useAppContext } from '../appContext'


function Sports() {
  const [route] = React.useState(useRouteMatch());
  const [sportsHtml, setSportsHtml] = React.useState([]);
  const [myTranslations] = React.useState(useAppContext())

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
    <div className="sports">
      <h2>{myTranslations.sports}</h2>

      <ul>
        {sportsHtml}
      </ul>
    </div>
  );
}

export default Sports