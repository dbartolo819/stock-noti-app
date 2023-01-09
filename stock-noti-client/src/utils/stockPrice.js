import StockApiClient from "./stockApi"

const STOCK_API_KEY = process.env.REACT_APP_STOCK_API_KEY;

const getPrice = async (stockSymbol) => {
  const stockRes = await StockApiClient.get(
    `/quote?symbol=${stockSymbol}&token=${STOCK_API_KEY}`
  );
  const { c: currPrice } = stockRes.data;

  return currPrice;
};

export default getPrice;
