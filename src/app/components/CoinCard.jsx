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

  const { loading, chartLoading, error, coin, priceHistory, currency, updateCurrency, updateDays } = useCoin(id);

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

      {chartLoading && <p>Updating chart...</p>}
      <LineChart priceData={priceHistory} currency={currency} />
    </div>
  );
}

function LineChart({ priceData, currency }) {
  if (!priceData || priceData.length === 0) {
    return <p>No chart data available</p>;
  }

  const symbol = currency === 'inr' ? 'Nu' : '$';
  
  // Format dates nicely
  const labels = priceData.map((item) => {
    const date = new Date(item[0]);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  
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
    maintainAspectRatio: true,
    plugins: {
      legend: { 
        display: true,
        position: 'top' 
      },
    },
    scales: {
      y: {
        title: { 
          display: true, 
          text: `Price (${currency === 'inr' ? 'BTN' : 'USD'})`,
          font: { size: 12 }
        },
        ticks: { 
          callback: (value) => `${symbol}${value.toLocaleString()}`,
          stepSize: 200000 
        }
      },
      x: {
        title: { 
          display: true, 
          text: "Date",
          font: { size: 12 }
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          autoSkipPadding: 20,
          maxTicksLimit: 8 
        }
      }
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Line data={data} options={options} />
    </div>
  );
}