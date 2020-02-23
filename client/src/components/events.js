import React from 'react';
import {
  Link,
  useRouteMatch
} from "react-router-dom";
import { getEvents } from '../api/data';

function Events() {
  const [route, setRoute] = React.useState(useRouteMatch());
  const [eventsHtml, setEventsHtml] = React.useState([]);
  const [titleHtml, setTitleHtml] = React.useState([]);

  React.useEffect(() => {
    createEventsList(route.params.sportId);
  }, []);

  async function createEventsList(sportId) {
    const response = await getEvents(sportId);

    setTitleHtml(() => (
      <h2>{response.sportDesc} Events</h2>
    ))

    setEventsHtml(response.events.sort((a, b) => a.pos - b.pos).map((item, i) => (
      <li key={i}>
        <a href={`${route.url}/events/${item.id}`}>{item.desc}</a>
      </li>
    )));
  }

  return (
    <div>
      {titleHtml}

      <ul>
        {eventsHtml}
      </ul>
    </div>
  );

}


export default Events;