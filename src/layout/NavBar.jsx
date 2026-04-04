import Link from "next/link";
import styles from "./NavBar.module.css";

export function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>Home</Link>
      <Link href="/market" className={styles.link}>Market</Link>
      <Link href="/trending" className={styles.link}>Trending</Link>
    </nav>
  );
}