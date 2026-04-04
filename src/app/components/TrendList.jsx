"use client";
import { useTrending } from "../hooks/useTrending";
import TrendCoinCard from "./TrendCoinCard";
import styles from "./TrendList.module.css";

export default function TrendList() {
  const { loading, error, coins } = useTrending();

  if (loading) return <p className={styles.statusMessage}>Loading</p>;
  if (error) return <p className={styles.statusMessage}>Unable to load the coins: {error}</p>;
  if (!coins || coins.length === 0) return <p className={styles.statusMessage}>No trending coins</p>;

  return (
    <section className={styles.section}>
      <div className={styles.columnLabels}>
        <span className={styles.columnLabel}>#</span>
        <span className={styles.columnLabel}></span>
        <span className={styles.columnLabel}>Asset</span>
        <span className={styles.columnLabel}>Price / Market Cap</span>
      </div>
      {coins.map((item) => (
        <TrendCoinCard
          key={item.item.id}
          name={item.item.name}
          symbol={item.item.symbol}
          market_cap_rank={item.item.market_cap_rank}
          small={item.item.small}
          price={item.item.data.price}
          market_cap={item.item.data.market_cap}
        />
      ))}
    </section>
  );
}
