import "../styles/CryptoCard.css";
import "@fontsource/montserrat";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { LineChart } from "@mui/x-charts/LineChart";
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

function CryptoCard(props) {
  const [displayText, setDisplayText] = useState(true);

  return (
    <div className="cryptoCardMainBody">
      {displayText ? <CryptoCardBody {...props} /> : <GraphCard {...props} />}
      <CryptoCardButtons
        {...props}
        displayText={displayText}
        setDisplayText={setDisplayText}
      />
    </div>
  );
}

function CryptoCardBody(props) {
  return (
    <div className="cryptoCardBody">
      <CryptoCardLeft {...props} />
      <CryptoCardRight {...props} />
    </div>
  );
}

function CryptoCardLeft(props) {
  const imageUrl = props.image; // Image URL
  const altText = `${props.name} Logo`; // Alt text for accessibility

  return (
    <div className="cryptoCardLeft">
      <img src={imageUrl} alt={altText} className="cryptoLogo" />
      <text className="cryptoNameCard">{props.name}</text>
    </div>
  );
}

function CryptoCardRight(props) {
  const { price, maxPrice, minPrice } = props;

  return (
    <div className="cryptoCardRight">
      <div>
        <text className="cryptoPriceValue">Current Price:</text>
        <text className="cryptoPriceValue">${price}</text>
      </div>
      <div>
        <text className="cryptoPriceValue">Highest Price (24h):</text>
        <text className="cryptoPriceValue">${maxPrice}</text>
      </div>
      <div>
        <text className="cryptoPriceValue">Lowest Price (24h):</text>
        <text className="cryptoPriceValue">${minPrice}</text>
      </div>
    </div>
  );
}

function CryptoCardButtons(props) {
  const navigate = useNavigate();

  console.log(props.username + " at cryptocard\n");

  return (
    <div className="cryptoCardButtons">
      {/* Pass a function reference to onClick */}
      <button
        className="cryptoButton"
        onClick={() => props.setDisplayText(true)}
      >
        See Text
      </button>
      <button
        className="cryptoButton"
        onClick={() => props.setDisplayText(false)}
      >
        See Graph
      </button>
      <button
        className="cryptoButton"
        onClick={() =>
          navigate("/expandedcrypto", { state: { username: props.username } })
        }
      >
        Expand
      </button>
    </div>
  );
}

function GraphCard(props) {
  const [graphData, setGraphData] = useState([]);

  const coin = "bitcoin";
  useEffect(() => {
    // Fetch the data from the backend
    axios
      .get(`http://localhost:8000/historical_data/bitcoin`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setGraphData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [coin]);

  // Prepare data for the LineChart
  const xAxisData = graphData.map((entry) =>
    new Date(entry.timestamp).toLocaleDateString()
  );
  console.log("x axis", xAxisData);
  const seriesData = graphData.map((entry) => entry.price);
  console.log("series data", seriesData);

  return (
    <div className="cryptoCardGraphBody">
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
                // make the position to the leftmost
                position: "insideLeft",
                offset: -30,
              }}
            />
            <Tooltip
              formatter={(value) => `$${value.toFixed(2)}`}
              labelFormatter={(label) => format(new Date(label), "MM/dd/yyyy")}
            />
            <Legend verticalAlign="top" />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              dot={false}
            />
            <Line type="monotone" dataKey="price" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CryptoCard;
