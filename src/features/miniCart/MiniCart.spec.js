import React from "react";
import { Provider } from "react-redux";
import { createStore } from "../../app/store";
import { render, screen, fireEvent } from "@testing-library/react";
import MiniCart from "./MiniCart";
import { products } from "../../testUtils";

test("render miniCart", () => {
  render(
    <Provider store={createStore()}>
      <MiniCart />
    </Provider>
  );

  // at first when app loads miniCart is not shown
  const miniCart = screen.getByRole("generic");
  expect(miniCart).toBeEmpty();
});

test("render miniCart with no items", () => {
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
      <MiniCart />
    </Provider>
  );

  const emptyCartMessage = screen.getByText(
    "Your cart is empty. Let's do some shopping"
  );
  expect(emptyCartMessage).toBeInTheDocument();
});

test("render miniCart with 2 items", () => {
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
          quantity: 32,
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
      show: true,
    },
    productList: {
      products,
      status: "idle",
    },
  };
  render(
    <Provider store={createStore(state)}>
      <MiniCart />
    </Provider>
  );

  // When app loads miniCart will have 2 items
  // items 1
  const productTitle1 = screen.getByText("Product 1");
  expect(productTitle1).toBeInTheDocument();

  const totalAmount1 = screen.getByText("$1248");
  expect(totalAmount1).toBeInTheDocument();

  const quantityText1 = screen.getByText("Qty 32");
  expect(quantityText1).toBeInTheDocument();

  // item 2
  const productTitle2 = screen.getByText("Product 2");
  expect(productTitle2).toBeInTheDocument();

  const totalAmount2 = screen.getByText("$40");
  expect(totalAmount2).toBeInTheDocument();

  const quantityText2 = screen.getByText("Qty 1");
  expect(quantityText2).toBeInTheDocument();
});

test("render miniCart with 2 items. Test removal of item 1", () => {
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
          quantity: 32,
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
      show: true,
    },
    productList: {
      products,
      status: "idle",
    },
  };
  render(
    <Provider store={createStore(state)}>
      <MiniCart />
    </Provider>
  );

  // removing the items by clicking on X
  const removeButton = screen.getAllByLabelText("remove button");
  fireEvent.click(removeButton[0]);

  // item 1 should be missing now
  const productTitle1 = screen.queryByText("Product 1");
  expect(productTitle1).not.toBeInTheDocument();

  const totalAmount1 = screen.queryByText("$1248");
  expect(totalAmount1).not.toBeInTheDocument();

  const quantityText1 = screen.queryByText("Qty 32");
  expect(quantityText1).not.toBeInTheDocument();

  // item 2 should be still present
  const productTitle2 = screen.queryByText("Product 2");
  expect(productTitle2).toBeInTheDocument();

  const totalAmount2 = screen.queryByText("$40");
  expect(totalAmount2).toBeInTheDocument();

  const quantityText3 = screen.queryByText("Qty 1");
  expect(quantityText3).toBeInTheDocument();
});
