"use client"

import { useState, useEffect, useCallback } from "react"
import { fetchCoinData, fetchCoinDetails } from "../lib/coingecko"

export const useCoin = (id) => {
    const [coin, setCoin] = useState(null)
    const [priceHistory, setPriceHistory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [chartLoading, setChartLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currency, setCurrency] = useState('usd')
    const [days, setDays] = useState('365')

    // Fetch coin details (only once)
    useEffect(() => {
        const fetchCoinDetailsOnly = async () => {
            if (!id) {
                setError('No coin id provided')
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                const data = await fetchCoinDetails(id)
                setCoin(data)
                setError(null)
            } catch (error) {
                setError(error?.message || 'Failed to load coin')
            } finally {
                setLoading(false)
            }
        }

        fetchCoinDetailsOnly()
    }, [id])

    // Fetch chart data separately when currency or days change
    const fetchChartData = useCallback(async () => {
        if (!id) return

        try {
            setChartLoading(true)
            const data = await fetchCoinData(id, currency, days)
            setPriceHistory(data.chart.prices)
        } catch (error) {
            console.error("Error fetching chart:", error)
        } finally {
            setChartLoading(false)
        }
    }, [id, currency, days])

    useEffect(() => {
        fetchChartData()
    }, [fetchChartData])

    const updateCurrency = (newCurrency) => {
        setCurrency(newCurrency)
    }

    const updateDays = (newDays) => {
        setDays(newDays)
    }

    return { 
        coin, 
        loading, 
        chartLoading,
        error, 
        priceHistory, 
        currency, 
        days, 
        updateCurrency, 
        updateDays 
    }
}