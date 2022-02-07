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
        {
          id: "123442",
          title: "Product 1",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
          image: "/product1.jpeg",
          price: "39",
          currency: "$",
          quantity: 22,
        },
        {
          id: "123443",
          title: "Product 2",
          desc: "Awesome product 2 description",
          image: "/product2.jpeg",
          price: "40",
          currency: "$",
          quantity: 1,
        },
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

  const quantity1 = screen.getByText("22");
  expect(quantity1).toBeInTheDocument();

  // product 2
  const productTitle2 = screen.getByText("Product 2");
  expect(productTitle2).toBeInTheDocument();

  const price2 = screen.getByText("$40");
  expect(price2).toBeInTheDocument();

  const description2 = screen.getByText(products[1].desc);
  expect(description2).toBeInTheDocument();

  const quantity2 = screen.getByText("1");
  expect(quantity2).toBeInTheDocument();
});

test("render product list with 2 items. Test decrement/increment of item quantity", () => {
  const state = {
    miniCart: {
      cart: [
        {
          id: "123442",
          title: "Product 1",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
          image: "/product1.jpeg",
          price: "39",
          currency: "$",
          quantity: 17,
        },
        {
          id: "123443",
          title: "Product 2",
          desc: "Awesome product 2 description",
          image: "/product2.jpeg",
          price: "40",
          currency: "$",
          quantity: 3,
        },
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
  const decrementButton = screen.getAllByLabelText("Decrement value");
  fireEvent.click(decrementButton[0]);

  const quantity1 = screen.getByText("16");
  expect(quantity1).toBeInTheDocument();

  const quantity2 = screen.queryByText("17");
  expect(quantity2).not.toBeInTheDocument();

  // increment the item quantity by 1 clicking on + button
  const incrementButton = screen.getAllByLabelText("Increment value");
  fireEvent.click(incrementButton[1]);

  const quantity3 = screen.queryByText("3");
  expect(quantity3).not.toBeInTheDocument();

  const quantity4 = screen.getByText("4");
  expect(quantity4).toBeInTheDocument();
});
