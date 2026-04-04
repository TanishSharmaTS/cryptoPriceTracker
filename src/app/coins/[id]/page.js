import { CoinCard } from "@/app/components/CoinCard"
import styles from  "@/app/components/CoinCard.module.css"


export default function CoinPage() {
  return (
    <div className={styles.page}>
      <p className={styles.pageTitle}>Asset Overview</p>
      <CoinCard />
    </div>
  )
}