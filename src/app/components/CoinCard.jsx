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

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,Filler)

export function CoinCard() {
  const params = useParams();
  const id = params?.id;

  const { loading, error, coin, priceHistory } = useCoin(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Unable to load coin details: {error}</p>;
  if (!coin) return <p>No coin found</p>;

  return (
    <div>
      <h1>{coin.name}</h1>
      <h2>{coin.symbol}</h2>
      <h3>{coin.hashing_algorithm}</h3>
      <p>{coin.description?.en}</p>

      <LineChart priceData={priceHistory} />
    </div>
  );
}

function LineChart({ priceData }) {
  if (!priceData || priceData.length === 0) {
    return <p>No chart data available</p>;
  }

  const labels = priceData.map((item) =>
    new Date(item[0]).toLocaleDateString()
  );

  const dataset = priceData.map((item) => item[1]);

  const data = {
    labels,
    datasets: [
      {
        label: "Price (USD)",
        data: dataset,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Price (USD)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <div style={{ width: "1000px", margin: "0 auto" }}>
      <Line data={data} options={options} />
    </div>
  );
}