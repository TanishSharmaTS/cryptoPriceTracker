"use client"

import { useState, useEffect } from "react"
import { fetchCoinData } from "../lib/coingecko"


export const useCoin = (id) => {

    const [coin, setCoin] = useState(null)
    const [priceHistory, setPriceHistory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currency, setCurrency] = useState('usd')
    const [days, setDays]= useState('365')

    useEffect(() => {
        if (!id) {
            setError('No coin id provided')
            setLoading(false)
            return
        }

        const getData = async () => {
            try {
                setLoading(true)
                const data = await fetchCoinData(id, currency, days)

                setCoin(data.coin)
                setPriceHistory(data.chart.prices)
                setError(null)
            } catch (error) {
                setError(error?.message || 'Failed to load coin')
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [id, currency, days])

    const updateCurrency = (newCurrency) => {
        setCurrency(newCurrency)
    }

    const updateDays = (newDays) => {
        setDays(newDays)
    }

    return { coin, loading, error, priceHistory, currency, updateCurrency, updateDays }
}
