import React from "react";
import { Provider } from "react-redux";

import App from "./App";
import { createStore } from "./app/store";
import { render, screen } from "@testing-library/react";

test("render App", () => {
  render(
    <Provider store={createStore()}>
      <App />
    </Provider>
  );

  const app = screen.getByRole("application");
  expect(app).not.toBeEmpty();
});
