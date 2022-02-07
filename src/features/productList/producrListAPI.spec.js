import { rest } from "msw";
import { setupServer } from "msw/node";
import { fetchProducts } from "./productListAPI";
import { originalResponse } from "../../testUtils";

const server = setupServer(
  rest.get(
    "https://dnc0cmt2n557n.cloudfront.net/products.json",
    (req, res, ctx) => {
      return res(ctx.json(originalResponse));
    }
  ),
  rest.get(
    "https://dnc0cmt2n557n.cloudfront.net/products.json.error",
    (req, res, ctx) => {
      return res(ctx.status(403));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("get data", async () => {
  const response = await fetchProducts(
    "https://dnc0cmt2n557n.cloudfront.net/products.json"
  );
  expect(response).toEqual(originalResponse.products);
});

test("get error while fetching data", async () => {
  console.error = jest.fn();
  const response = await fetchProducts(
    "https://dnc0cmt2n557n.cloudfront.net/products.json.error"
  );
  expect(response).toBeUndefined();
  expect(console.error).toHaveBeenCalledTimes(1);
});
