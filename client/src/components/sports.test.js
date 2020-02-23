import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Sports from "./sports";
import { getSports } from '../api/data';

jest.mock('../api/data');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useRouteMatch: () => ({ url: 'mockUrl.com' }),
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

describe('Sports', () => {
  it("renders without crashing", async () => {
    const fakeSports = [
      { id: 2, desc: 'sport 2', pos: 2 },
      { id: 1, desc: 'sport 1', pos: 1 }
    ]

    getSports.mockImplementation(() => Promise.resolve(fakeSports))

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Sports />, container);
    });

    expect(container.querySelector("h2").textContent).toBe("Sports");
    expect(container.querySelector("ul li:nth-child(1) a").getAttribute('href')).toEqual('mockUrl.com/1')
    expect(container.querySelector("ul li:nth-child(1) a").textContent).toEqual('sport 1')
    expect(container.querySelector("ul li:nth-child(2) a").getAttribute('href')).toEqual('mockUrl.com/2')
    expect(container.querySelector("ul li:nth-child(2) a").textContent).toEqual('sport 2')

  });
});