import React from "react";
import { Provider } from "react-redux";

import Header from "./Header";
import { createStore } from "../../app/store";
import { render, screen } from "@testing-library/react";

test("render Header with empty cart", () => {
  render(
    <Provider store={createStore()}>
      <Header />
    </Provider>
  );

  // at first when header has $0 0 Item
  const totalAmount = screen.getByText("$0");
  expect(totalAmount).toBeInTheDocument();

  const items = screen.getByText("0 Item");
  expect(items).toBeInTheDocument();
});
