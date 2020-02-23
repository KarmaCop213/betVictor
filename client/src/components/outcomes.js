import React from 'react';
import {
  useRouteMatch,
  useParams
} from "react-router-dom";
import { getOutcomes } from '../api/data';

function Outcomes() {
  const [route, setRoute] = React.useState(useRouteMatch());
  const [outcomesHtml, setOutcomesHtml] = React.useState([]);
  const [titleHtml, setTitleHtml] = React.useState([]);

  React.useEffect(() => {
    createOutcomeHtml(route.params.sportId, route.params.eventId);
  }, []);

  async function createOutcomeHtml(sportId, eventId) {
    const response = await getOutcomes(sportId, eventId);
    setTitleHtml(() => (
      <h2>{response.eventDesc}</h2>
    ))
    setOutcomesHtml(response.outcomes.map((item, i) => {
      const outcomeArraySorted = item.o.sort((a, b) => a.po - b.po);
      let children = outcomeArraySorted.map((oaItem, oai) => (
        <li key={oai}>
          {oaItem.d} ({oaItem.prd}) ({oaItem.pr})
        </li>
      ));
      return (
        <div key={i}>
          <div>{item.marketDesc}</div>
          <ul>
            {children}
          </ul>
        </div>
      )
    }));
  }

  return (
    <div>
      {titleHtml}

      <div>
        {outcomesHtml}
      </div>
    </div>
  );
}


export default Outcomes;