"use client";
import { useState, useEffect } from "react";
import { fetchTrendingCoins } from "../lib/coingecko";

export const useTrending = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [coins, setCoins] = useState([])

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const res = await fetchTrendingCoins()

        if (!res || !res.data?.coins) throw new Error("No trending data")
        setCoins(res.data.coins)
        setError(null)

      } catch (err) {
        setError(err.message || "Failed to load trending")

      } finally {
        setLoading(false)
      }
    };
    loadTrending()
  }, [])

  return { loading, error, coins }
};