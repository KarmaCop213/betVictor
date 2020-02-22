import React from 'react';
import {
  useRouteMatch,
  useParams
} from "react-router-dom";

function Outcomes() {
  let match = useRouteMatch();
  let { eventId } = useParams();

  return (
    <div>
      <h2>Outcomes for event {eventId}</h2>

      <ul>
        <li>
          <div>
            Outcome 1
          </div>
        </li>
        <li>
          <div>
            Outcome 2
          </div>
        </li>
        <li>
          <div>
            Outcome 3
          </div>
        </li>
      </ul>
    </div>
  );
}


export default Outcomes;