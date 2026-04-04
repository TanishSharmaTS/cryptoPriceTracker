"use client";

import { useParams } from "next/navigation"
import { useCoin } from "../hooks/useCoin"
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
import styles from "./CoinCard.module.css"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export function CoinCard() {
  const params = useParams();
  const id = params?.id;

  const { loading, chartLoading, error, coin, priceHistory, currency, updateCurrency, updateDays, days } = useCoin(id);

  if (loading) return <p className={styles.statusMessage}>Loading coin data</p>;
  if (error) return <p className={styles.statusMessage}>Unable to load coin details: {error}</p>;
  if (!coin) return <p className={styles.statusMessage}>No coin found</p>;

  const symbol = currency === 'inr' ? 'Nu' : '$';

  return (
    <div className={styles.card}>

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.coinName}>{coin.name}</h1>
          <div className={styles.coinMeta}>
            <span className={styles.coinSymbol}>{coin.symbol?.toUpperCase()}</span>
            {coin.hashing_algorithm && (
              <span className={styles.hashAlgo}>{coin.hashing_algorithm}</span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Currency</span>
          <button
            className={`${styles.btn} ${currency === 'usd' ? styles.btnActive : ''}`}
            onClick={() => updateCurrency('usd')}
          >
            USD ($)
          </button>
          <button
            className={`${styles.btn} ${currency === 'inr' ? styles.btnActive : ''}`}
            onClick={() => updateCurrency('inr')}
          >
            BTN (Nu)
          </button>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Period</span>
          <button
            className={`${styles.btn} ${days === '30' ? styles.btnActive : ''}`}
            onClick={() => updateDays('30')}
          >
            1 Month
          </button>
          <button
            className={`${styles.btn} ${days === '365' ? styles.btnActive : ''}`}
            onClick={() => updateDays('365')}
          >
            1 Year
          </button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCell}>
          <span className={styles.statLabel}>Current Price</span>
          <span className={`${styles.statValue} ${styles.priceValue}`}>
            {symbol} {coin.market_data?.current_price?.[currency]?.toLocaleString() ?? 0}
          </span>
        </div>

        <div className={styles.statCell}>
          <span className={styles.statLabel}>Market Cap</span>
          <span className={styles.statValue}>
            {symbol} {coin.market_data?.market_cap?.[currency]?.toLocaleString() ?? 0}
          </span>
        </div>

        <div className={styles.statCell}>
          <span className={styles.statLabel}>24h Volume</span>
          <span className={styles.statValue}>
            {symbol} {coin.market_data?.total_volume?.[currency]?.toLocaleString() ?? 0}
          </span>
        </div>

        <div className={styles.statCell}>
          <span className={styles.statLabel}>24h Change</span>
          <span className={
            coin.market_data?.price_change_percentage_24h > 0
              ? styles.changePositive
              : styles.changeNegative
          }>
            {coin.market_data?.price_change_percentage_24h > 0 ? '+' : ''}
            {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <span className={styles.chartTitle}>Price History</span>
          {chartLoading && <span className={styles.chartUpdating}>● Updating</span>}
        </div>
        <div className={styles.chartWrapper}>
          <LineChart priceData={priceHistory} currency={currency} />
        </div>
      </div>

      {coin.description?.en && (
        <div className={styles.descriptionSection}>
          <p className={styles.descriptionTitle}>About</p>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: coin.description.en }}
          />
        </div>
      )}

    </div>
  );
}

function LineChart({ priceData, currency }) {
  if (!priceData || priceData.length === 0) {
    return <p className={styles.statusMessage}>No chart data available</p>;
  }

  const symbol = currency === 'inr' ? 'Nu' : '$';

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
      borderColor: "#d4af37",
      backgroundColor: "rgba(212, 175, 55, 0.08)",
      pointRadius: 0,
      pointHoverRadius: 4,
      pointHoverBackgroundColor: "#d4af37",
      borderWidth: 1.5,
      tension: 0.3,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#111927",
        borderColor: "rgba(212, 175, 55, 0.35)",
        borderWidth: 1,
        titleColor: "#8a9ab5",
        bodyColor: "#f0cb5a",
        titleFont: { family: "'Space Mono', monospace", size: 11 },
        bodyFont: { family: "'Space Mono', monospace", size: 12, weight: 'bold' },
        padding: 10,
        callbacks: {
          label: (ctx) => ` ${symbol}${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.04)",
        },
        ticks: {
          color: "#4a5a72",
          font: { family: "'Space Mono', monospace", size: 10 },
          callback: (value) => `${symbol}${value.toLocaleString()}`,
        },
        border: { color: "rgba(255,255,255,0.06)" },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#4a5a72",
          font: { family: "'Space Mono', monospace", size: 10 },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
        },
        border: { color: "rgba(255,255,255,0.06)" },
      },
    },
  };

  return <Line data={data} options={options} />;
}
