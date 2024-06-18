import "../styles/StockCard.css";
import "@fontsource/montserrat";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";
import { format } from "date-fns";

function StockCard(props) {
  const [displayText, setDisplayText] = useState(true);
  const [ticker, setTicker] = useState(props.ticker);

  const handleSeeGraph = () => {
    setDisplayText(false); // Switch to graph view
  };

  return (
    <div className="stockCardMainBody">
      {displayText ? (
        <StockCardBody {...props} />
      ) : (
        <GraphCard {...props} ticker={ticker} />
      )}
      <StockCardButtons
        {...props}
        displayText={displayText}
        setDisplayText={setDisplayText}
        handleSeeGraph={handleSeeGraph}
        setTicker={setTicker}
      />
    </div>
  );
}

function StockCardBody(props) {
  return (
    <div className="stockCardBody">
      <StockCardLeft {...props} />
      <StockCardRight {...props} />
    </div>
  );
}

function StockCardLeft(props) {
  return (
    <div className="stockCardLeft">
      <text className="stockNameCard">{props.name}</text>
    </div>
  );
}

function StockCardRight(props) {
  const { price, minPrice, maxPrice, average } = props;

  return (
    <div className="stockCardRight">
      <div>
        <text className="stockPriceValue">Today's Price:</text>
        <text className="stockPriceValue">${price.toFixed(2)}</text>
      </div>
      <div>
        <text className="stockPriceValue">Highest Price (Week):</text>
        <text className="stockPriceValue">${maxPrice.toFixed(2)}</text>
      </div>
      <div>
        <text className="stockPriceValue">Lowest Price (Week):</text>
        <text className="stockPriceValue">${minPrice.toFixed(2)}</text>
      </div>
      <div>
        <text className="stockPriceValue">Average Price (Week):</text>
        <text className="stockPriceValue">${average.toFixed(2)}</text>
      </div>
    </div>
  );
}

function StockCardButtons(props) {
  const navigate = useNavigate();
  //   console.log("props", props);
  const {
    username,
    displayText,
    setDisplayText,
    handleSeeGraph,
    setTicker,
    ticker,
  } = props;

  const handleExpand = () => {
    navigate("/expandedstock", { state: { username, ticker } });
  };

  return (
    <div className="stockCardButtons">
      <button className="stockButton" onClick={() => setDisplayText(true)}>
        See Text
      </button>
      <button
        className="stockButton"
        onClick={() => {
          handleSeeGraph();
          setTicker(ticker);
        }}
      >
        See Graph
      </button>
      <button className="stockButton" onClick={handleExpand}>
        Expand
      </button>
    </div>
  );
}

function GraphCard({ ticker }) {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/historical_stock_data/${ticker}?days=7`)
      .then((response) => {
        // only keep the date and current price

        // console.log("stock", response.data);

        setGraphData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [ticker]);

  const formattedData = graphData.map((dataPoint) => ({
    timestamp: new Date(dataPoint.Date).getTime(), // Convert timestamp to milliseconds since Unix epoch
    price: dataPoint.current_price,
  }));

  return (
    <div className="stockCardGraphBody">
      <div className="graphBody">
        <ResponsiveContainer width="100%" height={375}>
          <LineChart
            data={graphData}
            margin={{ top: 30, right: 30, left: 50, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
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
            <Tooltip
              formatter={(value) => `$${value.toFixed(2)}`}
              labelFormatter={(label) => format(new Date(label), "MM/dd/yyyy")}
            />
            <Legend verticalAlign="top" />
            <Line type="monotone" dataKey="price" stroke="#8884d8" dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StockCard;
