"use client"
import { useParams } from "next/navigation"
import { useCoin } from "../hooks/useCoin"

export function CoinCard() {
  const params = useParams()
  const id = params?.id
  const { loading, error, coin } = useCoin(id)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Unable to load coin details: {error}</p>
  if (!coin) return <p>No coin found</p>

  return (
    <div>
      <h1>{coin.name}</h1>
      <h2>{coin.symbol}</h2>
      <h3>{coin.hashing_algorithm}</h3>
      <p>{coin.description?.en}</p>
    </div>
  )
}