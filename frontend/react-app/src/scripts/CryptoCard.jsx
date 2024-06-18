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
  return (
    <div className="cryptoCardLeft">
      <text className="cryptoNameCard">Bitcoin</text>
    </div>
  );
}

function CryptoCardRight(props) {
  return (
    <div className="cryptoCardRight">
      <text className="cryptoPriceText">Today's price:</text>

      <text className="cryptoPriceValue">60000 USD</text>

      <text className="cryptoPriceText">Average price this week:</text>

      <text className="cryptoPriceValue">55000 USD</text>
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
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={graphData}
            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
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
              }}
            />
            <Tooltip
              formatter={(value) => `$${value.toFixed(2)}`}
              labelFormatter={(label) => format(new Date(label), "MM/dd/yyyy")}
            />
            <Legend />
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
