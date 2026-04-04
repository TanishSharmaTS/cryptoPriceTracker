import styles from "./TrendCoinCard.module.css";

export default function TrendCoinCard({ name, symbol, market_cap_rank, small, price, market_cap }) {
  return (
    <div className={styles.card}>
      <span className={styles.rank}>{market_cap_rank}</span>
      <img src={small} alt={name} width={32} height={32} className={styles.image} />
      <div className={styles.nameGroup}>
        <p className={styles.name}>{name}</p>
        <p className={styles.symbol}>{symbol}</p>
      </div>
      <div className={styles.priceGroup}>
        <p className={styles.price}>${price}</p>
        <p className={styles.marketCap}>{market_cap}</p>
      </div>
    </div>
  );
}
