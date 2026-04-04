"use client";

import { useParams } from "next/navigation"
import { useCoin } from "../hooks/useCoin"
import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export function CoinCard() {
  const params = useParams();
  const id = params?.id;

  const { loading, error, coin, priceHistory, currency, updateCurrency, updateDays } = useCoin(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Unable to load coin details: {error}</p>;
  if (!coin) return <p>No coin found</p>;

  const symbol = currency === 'inr' ? 'Nu' : '$';

  return (
    <div>
      <h1>{coin.name}</h1>
      <h2>{coin.symbol}</h2>
      <h3>{coin.hashing_algorithm}</h3>
      <p>{coin.description?.en}</p>

      <div>
        <div>
          <label>Currency: </label>
          <button onClick={() => updateCurrency('usd')}>USD ($)</button>
          <button onClick={() => updateCurrency('inr')}>BTN (Nu)</button>
        </div>

        <div>
          <label>Time Period: </label>
          <button onClick={() => updateDays('30')}>1 Month</button>
          <button onClick={() => updateDays('365')}>1 Year</button>
        </div>
      </div>

      <div>
        <h3>Current Price: {symbol}{coin.market_data?.current_price?.[currency]?.toLocaleString() || 0}</h3>
        <p>Market Cap: {symbol}{coin.market_data?.market_cap?.[currency]?.toLocaleString() || 0}</p>
        <p>24h Volume: {symbol}{coin.market_data?.total_volume?.[currency]?.toLocaleString() || 0}</p>
        <p>24h Price Change:
          <span style={{
            color: coin.market_data?.price_change_percentage_24h > 0 ? "green" : "red",
            marginLeft: "5px"
          }}>
            {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </p>
      </div>

      <LineChart priceData={priceHistory} currency={currency} />
    </div>
  );
}

function LineChart({ priceData, currency }) {
  if (!priceData || priceData.length === 0) {
    return <p>No chart data available</p>;
  }

  const symbol = currency === 'inr' ? 'Nu' : '$';
  const labels = priceData.map((item) => new Date(item[0]).toLocaleDateString());
  const dataset = priceData.map((item) => item[1]);

  const data = {
    labels,
    datasets: [{
      label: `Price (${currency === 'inr' ? 'BTN' : 'USD'})`,
      data: dataset,
      fill: true,
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.2,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${symbol}${context.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        title: { display: true, text: `Price (${currency === 'inr' ? 'BTN' : 'USD'})` },
        ticks: { callback: (value) => `${symbol}${value.toLocaleString()}` }
      },
      x: { title: { display: true, text: "Date" } }
    },
  };

  return (
    <div style={{ width: "1000px", margin: "0 auto" }}>
      <Line data={data} options={options} />
    </div>
  );
}