import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Outcomes from "./outcomes";
import { getOutcomes } from '../api/data';

jest.mock('../api/data');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useRouteMatch: () => ({
    url: 'mockUrl.com/10',
    params: {
      sportId: '10',
      eventId: '20',
    }
  }),
}));

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Outcomes', () => {
  it("renders without crashing", async () => {
    const fakeOutcomes = {
      eventDesc: 'Test Event',
      outcomes: [{
        marketDesc: "Match Betting",
        o: [
          { po: 2, d: 'team 1', prd: 1, pr: '1' },
          { po: 1, d: 'team 2', prd: 2, pr: '2' },
        ]
      },
      {
        marketDesc: "Different",
        o: [
          { po: 2, d: 'team 1', prd: 3, pr: '3' },
          { po: 1, d: 'team 2', prd: 4, pr: '4' },
        ]
      }]
    }

    getOutcomes.mockImplementation(() => Promise.resolve(fakeOutcomes))

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Outcomes />, container);
    });

    expect(container.querySelector("h2").textContent).toBe("Test Event");
    expect(container.querySelector("div div div div:nth-child(1) div ").textContent).toEqual('Match Betting')
    expect(container.querySelector("div div div div:nth-child(1) ul li:nth-child(1)").textContent).toEqual('team 2 (2) (2)')
    expect(container.querySelector("div div div div:nth-child(1) ul li:nth-child(2)").textContent).toEqual('team 1 (1) (1)')
    expect(container.querySelector("div div div div:nth-child(2) div").textContent).toEqual('Different')
    expect(container.querySelector("div div div div:nth-child(2) ul li:nth-child(1)").textContent).toEqual('team 2 (4) (4)')
    expect(container.querySelector("div div div div:nth-child(2) ul li:nth-child(2)").textContent).toEqual('team 1 (3) (3)')

  });
});