import miniCartReducer, {
  incrementItemQty,
  decrementItemQty,
  removeItem,
  toggleMiniCartShow,
  setMiniCartShow,
} from "./miniCartSlice";
import { getProducts } from "../productList/productListSlice";
import { products } from "../../testUtils";

describe("miniCart reducer", () => {
  const initialState = {
    cart: [],
    show: false,
  };

  const stateWithFullCart = {
    cart: [
      {
        id: "99",
        quantity: 56,
        title: "Product 1",
        desc: "product 1 description",
        image: "/product1.jpeg",
        price: "39",
        currency: "$",
      },
      {
        id: "42",
        quantity: 5,
        title: "Product 2",
        desc: "product 2 description",
        image: "/product2.jpeg",
        price: "39",
        currency: "$",
      },
      {
        id: "101",
        quantity: 1,
        title: "Product 3",
        desc: "product 3 description",
        image: "/product3.jpeg",
        price: "39",
        currency: "$",
      },
      {
        id: "9",
        quantity: 8,
        title: "Product 4",
        desc: "product 4 description",
        image: "/product4.jpeg",
        price: "39",
        currency: "$",
      },
      {
        id: "420",
        quantity: 0,
        title: "Product 5",
        desc: "product 5 description",
        image: "/product5.jpeg",
        price: "39",
        currency: "$",
      },
    ],
    show: false,
  };

  // state intialization
  it("should handle initial state", () => {
    expect(miniCartReducer(undefined, { type: "unknown" })).toEqual({
      cart: [],
      show: false,
    });
  });

  // incrementItemQty
  it("should add item to cart as last item with quantity 1", () => {
    const actual = miniCartReducer(initialState, incrementItemQty({ id: 99 }));
    expect(actual.cart[actual.cart.length - 1].quantity).toEqual(1);
  });

  it("should become 57 since item id 99 is in the cart.", () => {
    const actual = miniCartReducer(
      stateWithFullCart,
      incrementItemQty({
        item: stateWithFullCart.cart.find((item) => item.id === "99"),
      })
    );
    expect(actual.cart.find((item) => item.id === "99").quantity).toEqual(57);
  });

  // decrementItemQty
  it("should become 4.", () => {
    const actual = miniCartReducer(
      stateWithFullCart,
      decrementItemQty({
        item: stateWithFullCart.cart.find((item) => item.id === "42"),
      })
    );
    expect(actual.cart.find((item) => item.id === "42").quantity).toEqual(4);
  });

  it("should be removed from cart", () => {
    const actual = miniCartReducer(
      stateWithFullCart,
      decrementItemQty({
        item: stateWithFullCart.cart.find((item) => item.id === "101"),
      })
    );
    expect(actual.cart.find((item) => item.id === "101")).toBeUndefined();
  });

  it("should do nothing since no item id 1234 is in cart", () => {
    const actual = miniCartReducer(
      stateWithFullCart,
      decrementItemQty({
        item: { id: "1234" },
      })
    );
    expect(actual).toEqual(stateWithFullCart);
  });

  it("should remove the item form cart", () => {
    const actual = miniCartReducer(
      stateWithFullCart,
      decrementItemQty({
        item: stateWithFullCart.cart.find((item) => item.id === "420"),
      })
    );
    expect(actual).toEqual(stateWithFullCart);
  });

  // removeItem
  it("should remove item from cart", () => {
    const actual = miniCartReducer(
      stateWithFullCart,
      removeItem({
        item: stateWithFullCart.cart.find((item) => item.id === "99"),
      })
    );
    expect(actual.cart.find((item) => item.id === "99")).toBeUndefined();
  });

  // toggleMiniCartShow
  it("should toggle between true and false", () => {
    const actual = miniCartReducer(stateWithFullCart, toggleMiniCartShow());
    expect(actual.show).toEqual(true);
    const actual2 = miniCartReducer(actual, toggleMiniCartShow());
    expect(actual2.show).toEqual(false);
  });

  // setMiniCartShow
  it("should set show to provided value", () => {
    const actual = miniCartReducer(
      stateWithFullCart,
      setMiniCartShow({ show: false })
    );
    expect(actual.show).toEqual(false);
    const actual2 = miniCartReducer(actual, setMiniCartShow({ show: true }));
    expect(actual2.show).toEqual(true);
  });

  // getProducts fullfilled
  it("should populate cart with all products wtih quantity 1", () => {
    const actual = miniCartReducer(
      initialState,
      getProducts.fulfilled(products)
    );
    expect(actual.cart).toEqual([
      {
        id: "123442",
        title: "Product 1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        image: "/product1.jpeg",
        price: "39",
        currency: "$",
        quantity: 1,
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
    ]);
  });

  it("should populate not do anything to cart since cart state is loaded from saved state", () => {
    localStorage.setItem("stateLoadedFromLocalStorage", true);
    const actual = miniCartReducer(
      stateWithFullCart,
      getProducts.fulfilled(products)
    );
    expect(actual.cart).toEqual(stateWithFullCart.cart);
  });
});
