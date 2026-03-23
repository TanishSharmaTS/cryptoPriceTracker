"use client";

import { useEffect, useState } from "react"
import { fetchCoins } from "../lib/coingecko"

export const useCoins = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadCoins = async () => {
            try {
                setLoading(true)
                const data = await fetchCoins()
                setCoins(data)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadCoins()
    }, [])

    return { coins, loading, error }
}
