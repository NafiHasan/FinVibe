import "../styles/Stocks.css";
import NavigationBar from "./NavigationBar";
import StockCard from "./StockCard";
import { useLocation } from "react-router-dom";
import TrendingTab from "./TrendingTab";
import { useState, useEffect } from "react";
import axios from "axios";

function Stocks() {
  const location = useLocation();
  let username = location.state.username;

  return (
    <div className="stocksMainBody">
      <NavigationBar username={username} />
      <StocksBody username={username} />
    </div>
  );
}

function StocksBody(props) {
  return (
    <div className="stocksBody">
      <StocksLeftHalf {...props} />
      <StocksRightHalf {...props} />
    </div>
  );
}

function StocksLeftHalf(props) {
  return (
    <div className="stocksLeftColumn">
      <TrendingTab />
    </div>
  );
}

function StocksRightHalf() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Fetch list of stocks
    axios
      .get("http://localhost:8000/stocks")
      .then((response) => {
        setStocks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching stocks:", error);
      });
  }, []);

  return (
    <div className="stocksRightColumn">
      {stocks.map((stock) => (
        <StockCard
          key={stock.ticker}
          ticker={stock.ticker}
          name={stock.company_name}
          price={stock.current_price}
          minPrice={stock.min_price}
          maxPrice={stock.max_price}
          average={stock.average}
        />
      ))}
    </div>
  );
}

export default Stocks;
