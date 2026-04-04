import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>

        <p className={styles.eyebrow}>Live Market Data</p>

        <h1 className={styles.title}>
          Track Crypto.<br />
          <span className={styles.titleAccent}>Stay Ahead.</span>
        </h1>

        <p className={styles.description}>
          Real-time prices, market caps, and trends for the top cryptocurrencies.
          Built for everyone.
        </p>

        <div className={styles.cta}>
          <Link href="/market" className={styles.btnPrimary}>View Market</Link>
          <Link href="/trending" className={styles.btnSecondary}>Trending</Link>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>Top 10</span>
            <span className={styles.statLabel}>Coins Tracked</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>Live</span>
            <span className={styles.statLabel}>Price Updates</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>1Y</span>
            <span className={styles.statLabel}>Price History</span>
          </div>
        </div>

      </div>
    </main>
  );
}