import TrendList from "../components/TrendList";
import styles from "./TrendingPage.module.css";

export default function TrendingPage() {
  return (
    <main className={styles.main}>
      <h1>Trending</h1>
      <TrendList />
    </main>
  );
}
