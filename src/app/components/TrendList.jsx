"use client";
import { useTrending } from "../hooks/useTrending";
import TrendCoinCard from "./TrendCoinCard";

export default function TrendList() {
  const { loading, error, coins } = useTrending();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Unable to load the coins: {error}</p>;
  if (!coins || coins.length === 0) return <p>No trending coins</p>;

  return (
    <section>
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