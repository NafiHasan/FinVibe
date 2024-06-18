import "../styles/ExpandedStock.css";
import NavigationBar from "./NavigationBar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { format } from "date-fns";

function ExpandedStock() {
  const location = useLocation();
  const [username] = useState(location.state.username);

  // State for the first ticker
  const [ticker1] = useState("AAPL");
  const [graphData1, setGraphData1] = useState([]);

  // State for the second ticker
  const [ticker2, setTicker2] = useState("MSFT");
  const [graphData2, setGraphData2] = useState([]);

  // State for the number of days
  const [days, setDays] = useState(30);

  const fetchData = () => {
    // Fetch data for the first ticker
    axios
      .get(
        `http://localhost:8000/historical_stock_data/${ticker1}?days=${days}`
      )
      .then((response) => {
        setGraphData1(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data for ticker 1:", error);
      });

    // Fetch data for the second ticker
    axios
      .get(
        `http://localhost:8000/historical_stock_data/${ticker2}?days=${days}`
      )
      .then((response) => {
        setGraphData2(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data for ticker 2:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [ticker2, days]);

  return (
    <div className="expandedStockMainBody">
      <NavigationBar username={username} />
      <ExpandedStockBody
        username={username}
        ticker1={ticker1}
        setTicker1={() => {}}
        ticker2={ticker2}
        setTicker2={setTicker2}
        graphData1={graphData1}
        graphData2={graphData2}
        days={days}
        setDays={setDays}
        fetchData={fetchData}
      />
    </div>
  );
}

function ExpandedStockBody({
  username,
  ticker1,
  ticker2,
  setTicker2,
  graphData1,
  graphData2,
  days,
  setDays,
  fetchData,
}) {
  return (
    <div className="expandedStockBody">
      <LeftHalf
        username={username}
        ticker1={ticker1}
        ticker2={ticker2}
        setTicker2={setTicker2}
        graphData1={graphData1}
        graphData2={graphData2}
        days={days}
        setDays={setDays}
        fetchData={fetchData}
      />
      <RightHalf
        ticker2={ticker2}
        setTicker2={setTicker2}
        days={days}
        setDays={setDays}
      />
    </div>
  );
}

function LeftHalf({
  username,
  ticker1,
  ticker2,
  setTicker2,
  graphData1,
  graphData2,
  days,
  setDays,
  fetchData,
}) {
  return (
    <div className="leftHalf">
      <GraphCard
        username={username}
        ticker1={ticker1}
        ticker2={ticker2}
        graphData1={graphData1}
        graphData2={graphData2}
      />
    </div>
  );
}

function RightHalf({ ticker2, setTicker2, days, setDays }) {
  const tickerSymbols = [
    "AAPL",
    "GOOGL",
    "AMZN",
    "TSLA",
    "MSFT",
    "META",
    "JPM",
    "BAC",
    "WFC",
    "C",
    "GS",
    "V",
    "MA",
    "PYPL",
    "ADBE",
    "CRM",
    "ORCL",
    "IBM",
    "INTC",
    "AMD",
    "NVDA",
    "QCOM",
    "TSM",
    "MU",
    "NFLX",
    "DIS",
    "CMCSA",
    "EA",
    "TTWO",
    "T",
    "VZ",
    "TMUS",
    "S",
    "TM",
    "F",
    "GM",
    "HMC",
    "NSANY",
  ];

  return (
    <div className="rightBody">
      <div className="controls">
        <div>
          <label htmlFor="days">Days:</label>
          <select
            id="days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          >
            <option value="7">7</option>
            <option value="30">30</option>
            <option value="90">90</option>
            <option value="180">180</option>
            <option value="365">365</option>
          </select>
        </div>
        <div>
          <label htmlFor="ticker2">Second Stock:</label>
          <select
            id="ticker2"
            value={ticker2}
            onChange={(e) => setTicker2(e.target.value)}
          >
            {tickerSymbols.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function GraphCard({ username, ticker1, ticker2, graphData1, graphData2 }) {
  const mergedData = graphData1.map((dataPoint1, index) => {
    const dataPoint2 = graphData2[index];
    return {
      timestamp: new Date(dataPoint1.timestamp).getTime(),
      price1: dataPoint1.price,
      price2: dataPoint2 ? dataPoint2.price : null,
    };
  });
  const days = mergedData.length;
  console.log("days", days);

  return (
    <div className="expGraph1">
      <h3>Stock Price Comparison</h3>
      <ResponsiveContainer width={900} height={400}>
        <LineChart
          data={mergedData}
          margin={{ top: 30, right: 30, left: 50, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) =>
              format(new Date(timestamp), "MM/dd/yyyy")
            }
          >
            <Label value="Date" offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis
            tickFormatter={(price) => `$${price.toFixed(2)}`}
            label={{
              value: "Price (USD)",
              angle: -90,
              position: "insideLeft",
              offset: -20,
            }}
          />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="price1"
            stroke="#8884d8"
            dot={days < 100}
            name={ticker1}
          />
          <Line
            type="monotone"
            dataKey="price2"
            stroke="#82ca9d"
            dot={days < 100}
            name={ticker2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpandedStock;
