import "../styles/Crypto.css";
import NavigationBar from "./NavigationBar";
import CryptoCard from "./CryptoCard";
import { useLocation } from "react-router-dom";
import TrendingTab from "./TrendingTab";
import { useState, useEffect } from "react";
import axios from "axios";

function Crypto() {
  const location = useLocation();

  let username = location.state.username;

  return (
    <div className="cryptoMainBody">
      <NavigationBar username={username} />
      <CryptoBody username={username} />
    </div>
  );
}

function CryptoBody(props) {
  return (
    <div className="cryptoBody">
      <CryptoLeftHalf {...props} />
      <CryptoRightHalf {...props} />
    </div>
  );
}

function CryptoLeftHalf(props) {
  return (
    <div className="cryptoLeftColumn">
      <TrendingTab />
    </div>
  );
}

function CryptoRightHalf() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    // Fetch list of cryptocurrencies
    axios
      .get("http://localhost:8000/cryptocurrencies")
      .then((response) => {
        setCryptos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cryptocurrencies:", error);
      });
  }, []);

  return (
    <div className="cryptoRightColumn">
      {cryptos.map((crypto) => (
        <CryptoCard
          key={crypto.id}
          coin={crypto.id}
          name={crypto.name}
          image={crypto.image}
          price={crypto.current_price}
          minPrice={crypto.low_24h}
          maxPrice={crypto.high_24h}
        />
      ))}
    </div>
  );
}

export default Crypto;
