"use client";

import { useCoins } from "../hooks/useCoins"
import Link from "next/link";
import styles from "./CoinList.module.css";

export default function CoinList() {
  const { coins, loading, error } = useCoins();

  if (loading) return <p className={styles.statusMessage}>Loading cryptocurrencies</p>;
  if (error)   return <p className={styles.statusMessage}>Error: {error}</p>;
  if (!coins || coins.length === 0) return <p className={styles.statusMessage}>No coins found</p>;

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h2 className={styles.title}>Top 10 Cryptocurrencies</h2>
        <span className={styles.subtitle}>Live Prices</span>
      </div>

      <div className={styles.columnLabels}>
        <span className={styles.columnLabel}>#</span>
        <span className={styles.columnLabel}>Asset</span>
        <span className={styles.columnLabel}>Price</span>
        <span className={styles.columnLabel}>Market Cap</span>
        <span className={styles.columnLabel}>24h</span>
      </div>

      {coins.slice(0, 10).map((coin, index) => (
        <Link key={coin.id} href={`/coins/${coin.id}`} className={styles.coinLink}>
          <div className={styles.coinRow}>

            <span className={styles.rank}>{index + 1}</span>

            <div className={styles.nameCell}>
              {coin.image && (
                <img
                  src={coin.image}
                  alt={coin.name}
                  className={styles.coinImage}
                  width={28}
                  height={28}
                />
              )}
              <div className={styles.nameGroup}>
                <span className={styles.coinName}>{coin.name}</span>
                <span className={styles.coinSymbol}>{coin.symbol?.toUpperCase()}</span>
              </div>
            </div>

            <span className={styles.priceCell}>
              ${coin.current_price?.toLocaleString() ?? '—'}
            </span>

            <span className={styles.marketCapCell}>
              ${coin.market_cap?.toLocaleString() ?? '—'}
            </span>

            <span className={styles.changeCell}>
              <span className={
                coin.price_change_percentage_24h > 0
                  ? styles.changePositive
                  : styles.changeNegative
              }>
                {coin.price_change_percentage_24h > 0 ? '+' : ''}
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </span>

          </div>
        </Link>
      ))}

    </div>
  );
}
