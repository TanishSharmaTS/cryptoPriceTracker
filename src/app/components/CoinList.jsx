"use client";

import { useCoins } from "../hooks/useCoins"
import Link from "next/link";

export default function CoinList() {
    const { coins, loading, error } = useCoins();

    console.log("CoinList - rendering with", coins.length, "coins")

    if (loading) return <p>Loading cryptocurrencies...</p>

    if (error) return <p>Error: {error}</p>

    if (!coins || coins.length === 0) return <p>No coins found</p>

    return (
        <div>
            <h2>Top 10 Cryptocurrencies</h2>
            {coins.slice(0, 10).map((coin) => (
                <Link key={coin.id} href={`/coins/${coin.id}`}>
                    <div  style={{ margin: "10px 0", padding: "10px", border: "1px solid #ccc" }}>
                        <strong>{coin.name}</strong> ({coin.symbol.toUpperCase()}) -
                        ${coin.current_price?.toLocaleString()}
                        <span style={{
                            color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                            marginLeft: "10px"
                        }}>
                            {coin.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    )
}