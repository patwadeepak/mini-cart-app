import productListReducer from "./productListSlice";
import { getProducts } from "../productList/productListSlice";
import { products } from "../../testUtils";

describe("product list reducer", () => {
  const initialState = {
    products: [],
    status: "idle",
  };

  // state intialization
  it("should handle initial state", () => {
    expect(productListReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  // getProducts pending
  it("should update status to loading", () => {
    const actual = productListReducer(initialState, getProducts.pending());
    expect(actual).toEqual({
      products: [],
      status: "loading",
    });
  });

  // getProducts fulfilled
  it("should update status to idle and products in state", () => {
    const actual = productListReducer(
      initialState,
      getProducts.fulfilled(products)
    );
    expect(actual).toEqual({
      products,
      status: "idle",
    });
  });

  // getProducts fulfilled
  it("should update status to error and products empty", () => {
    const actual = productListReducer(initialState, getProducts.rejected());
    expect(actual).toEqual({
      products: [],
      status: "error",
    });
  });
});
