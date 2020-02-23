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

describe('Sports', () => {
  it("renders without crashing", async () => {
    await act(async () => {
      render(<App />, container);
    });
    expect(container.querySelector("div a").getAttribute('href')).toEqual('/sports')
  })
});