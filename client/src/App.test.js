import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
// import { render } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import App from './App';

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

describe('App', () => {
  it("renders the sports page by default", async () => {
    await act(async () => {
      render(<App />, container);
    });
    expect(container.querySelector("div.sports").textContent).toEqual('Sports')
  })
});