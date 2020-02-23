import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Events from "./events";
import { getEvents } from '../api/data';

jest.mock('../api/data');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useRouteMatch: () => ({
    url: 'mockUrl.com/10',
    params: {
      sportId: '10',
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

describe('Events', () => {
  it("renders without crashing", async () => {
    const fakeEvents = {
      sportDesc: "Sport",
      events: [
        { id: 2, desc: 'event 2', pos: 2 },
        { id: 1, desc: 'event 1', pos: 1 }
      ]
    }

    getEvents.mockImplementation(() => Promise.resolve(fakeEvents))

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Events />, container);
    });

    expect(container.querySelector("h2").textContent).toBe("Sport Events");
    expect(container.querySelector("ul li:nth-child(1) a").getAttribute('href')).toEqual('mockUrl.com/10/events/1')
    expect(container.querySelector("ul li:nth-child(1) a").textContent).toEqual('event 1')
    expect(container.querySelector("ul li:nth-child(2) a").getAttribute('href')).toEqual('mockUrl.com/10/events/2')
    expect(container.querySelector("ul li:nth-child(2) a").textContent).toEqual('event 2')

  });
});