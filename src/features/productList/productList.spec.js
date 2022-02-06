import React from "react";
import { Provider } from "react-redux";
import { createStore } from "../../app/store";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductList from "./ProductList";
import { products } from "../../testUtils";

test("render product list", () => {
  render(
    <Provider store={createStore()}>
      <ProductList />
    </Provider>
  );

  // product list is empty at first
  const productList = screen.getByRole("list");
  expect(productList).toBeEmpty();
});

test("product list not rendered since show cart is true", () => {
  const state = {
    miniCart: {
      cart: [],
      show: true,
    },
    productList: {
      products,
      status: "idle",
    },
  };

  render(
    <Provider store={createStore(state)}>
      <ProductList />
    </Provider>
  );

  const productList = screen.queryByRole("list");
  expect(productList).not.toBeInTheDocument();
});

test("product list render with 2 products with icons, counter, title, desc and price", () => {
  const state = {
    miniCart: {
      cart: [
        { id: "123442", quantity: 22 },
        { id: "123443", quantity: 1 },
      ],
      show: false,
    },
    productList: {
      products,
      status: "idle",
    },
  };
  render(
    <Provider store={createStore(state)}>
      <ProductList />
    </Provider>
  );

  // When app loads products will be loaded
  // items 1
  const productTitle1 = screen.getByText("Product 1");
  expect(productTitle1).toBeInTheDocument();

  const price1 = screen.getByText("$39");
  expect(price1).toBeInTheDocument();

  const description1 = screen.getByText(products[0].desc);
  expect(description1).toBeInTheDocument();

  const quantity1 = screen.queryByDisplayValue("22");
  expect(quantity1).toBeInTheDocument();

  // product 2
  const productTitle2 = screen.getByText("Product 2");
  expect(productTitle2).toBeInTheDocument();

  const price2 = screen.getByText("$40");
  expect(price2).toBeInTheDocument();

  const description2 = screen.getByText(products[1].desc);
  expect(description2).toBeInTheDocument();

  const quantity2 = screen.queryByDisplayValue("1");
  expect(quantity2).toBeInTheDocument();
});

test("render product list with 2 items. Test decrement/increment of item quantity", () => {
  const state = {
    miniCart: {
      cart: [
        { id: "123442", quantity: 17 },
        { id: "123443", quantity: 1 },
      ],
      show: false,
    },
    productList: {
      products,
      status: "idle",
    },
  };
  render(
    <Provider store={createStore(state)}>
      <ProductList />
    </Provider>
  );

  // decrement the item quantity by 1 clicking on - button
  const decrementButton = screen.getAllByText(/-/i);
  fireEvent.click(decrementButton[0]);

  const quantity1 = screen.queryByDisplayValue("17");
  expect(quantity1).not.toBeInTheDocument();

  const quantity2 = screen.queryByDisplayValue("16");
  expect(quantity2).toBeInTheDocument();

  // increment the item quantity by 1 clicking on + button
  const incrementButton = screen.getAllByText(/\+/i);
  fireEvent.click(incrementButton[1]);

  const quantity3 = screen.queryByDisplayValue("1");
  expect(quantity3).not.toBeInTheDocument();

  const quantity4 = screen.queryByDisplayValue("2");
  expect(quantity4).toBeInTheDocument();
});

test("render product list with 2 items. Test decrement/increment of item quantity", () => {
  const state = {
    miniCart: {
      cart: [
        { id: "123442", quantity: 63 },
        { id: "123443", quantity: 1 },
      ],
      show: false,
    },
    productList: {
      products,
      status: "idle",
    },
  };
  render(
    <Provider store={createStore(state)}>
      <ProductList />
    </Provider>
  );

  // set quantity from 63 to 44
  const textBox = screen.queryByDisplayValue(/63/i);
  fireEvent.change(textBox, { target: { value: "44" } });

  const quantity1 = screen.queryByDisplayValue("44");
  expect(quantity1).toBeInTheDocument();

  const quantity2 = screen.queryByDisplayValue("63");
  expect(quantity2).not.toBeInTheDocument();
});
