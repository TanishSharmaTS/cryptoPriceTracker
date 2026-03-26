"use client"

import { useState, useEffect } from "react"
import { fetchCoinData } from "../lib/coingecko"


export const useCoin = (id) => {

    const [coin, setCoin] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) {
            setError('No coin id provided')
            setLoading(false)
            return
        }

        const getData = async () => {
            try {
                setLoading(true)
                const data = await fetchCoinData(id)

                console.log(data)
                setCoin(data.coin)
                setError(null)
            } catch (error) {
                setError(error?.message || 'Failed to load coin')
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [id])

    return { coin, loading, error }
}
