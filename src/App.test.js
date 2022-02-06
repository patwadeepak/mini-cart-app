import React from "react";
import { Provider } from "react-redux";

import App from "./App";
import { createStore } from "./app/store";
import { render, screen, fireEvent } from "@testing-library/react";

test("render App", () => {
  render(
    <Provider store={createStore()}>
      <App />
    </Provider>
  );

  screen.debug();

  // at first when app loads without any products and items in cart
  const app = screen.getByRole("application");
  expect(app).not.toBeEmpty();
});
