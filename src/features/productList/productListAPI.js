// A function to making an async request for products data
export const fetchProducts = async (
  url = "https://dnc0cmt2n557n.cloudfront.net/products.json"
) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const products = json.products;
    return products;
  } catch (error) {
    console.error(error);
  }
};
