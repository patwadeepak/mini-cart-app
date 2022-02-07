import miniCartReducer, {
  incrementItemQty,
  decrementItemQty,
  setItemQty,
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
      { id: "99", quantity: "56" },
      { id: "42", quantity: "5" },
      { id: "101", quantity: "1" },
      { id: "9", quantity: "8" },
      { id: "420", quantity: "0" },
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
      incrementItemQty({ id: "99" })
    );
    expect(actual.cart.find((item) => item.id === "99").quantity).toEqual(57);
  });

  // decrementItemQty
  it("should become 4.", () => {
    const actual = miniCartReducer(
      stateWithFullCart,
      decrementItemQty({ id: "42" })
    );
    expect(actual.cart.find((item) => item.id === "42").quantity).toEqual(4);
  });

  it("should be removed from cart", () => {
    const actual = miniCartReducer(
      stateWithFullCart,
      decrementItemQty({ id: "101" })
    );
    expect(actual.cart.find((item) => item.id === "101")).toBeUndefined();
  });

  it("should do nothing since no item id 1234 is in cart", () => {
    const actual = miniCartReducer(
      stateWithFullCart,
      decrementItemQty({ id: "1234" })
    );
    expect(actual).toEqual(stateWithFullCart);
  });

  it("should remove the item form cart", () => {
    const actual = miniCartReducer(
      stateWithFullCart,
      decrementItemQty({ id: "420" })
    );
    expect(actual).toEqual(stateWithFullCart);
  });

  // setItemQty
  it("should be 50", () => {
    const actual = miniCartReducer(
      stateWithFullCart,
      setItemQty({
        id: "101",
        quantity: "50",
        inputType: "insertText",
        data: "5",
      })
    );
    expect(actual.cart.find((item) => item.id === "101").quantity).toEqual(50);
  });

  it("should be removed from cart", () => {
    const actual = miniCartReducer(
      stateWithFullCart,
      setItemQty({
        id: "101",
        quantity: "",
        inputType: "insertText",
        data: "5",
      })
    );
    expect(actual.cart.find((item) => item.id === "101")).toBeUndefined();
  });

  it("should be added to cart with given quantity", () => {
    const actual = miniCartReducer(
      stateWithFullCart,
      setItemQty({
        id: "57",
        quantity: "29",
        inputType: "insertText",
        data: "5",
      })
    );
    expect(actual.cart.find((item) => item.id === "57").quantity).toEqual(29);
  });

  // removeItem
  it("should remove item from cart", () => {
    const actual = miniCartReducer(stateWithFullCart, removeItem({ id: "99" }));
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
      { id: "123442", quantity: 1, price: "39", title: "Product 1" },
      { id: "123443", quantity: 1, price: "40", title: "Product 2" },
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
