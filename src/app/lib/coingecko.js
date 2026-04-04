export const fetchCoins = async () => {
    try {
        const res = await fetch("/api/coins")

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        const coins = Array.isArray(data) ? data : data.coins ?? data.data ?? []

        return coins

    } catch (error) {
        console.error("Error fetching coins:", error)
        return []
    }
}

export const fetchCoinDataFull = async (id, currency='usd', days='365') => {

    try {
        const res = await fetch(`/api/coins/${id}?currency=${currency}&days=${days}`)

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()

        return {
            coin: data.coin,
            chart:data.chart
        }

    } catch (error) {
        console.error("Error fetching coin data:", error)
        throw error
    }
}

export const fetchCoinDetails = async (id) => {
    try {
        const res = await fetch(`/api/coins/${id}?details_only=true`)

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        return data.coin
    } catch (error) {
        console.error("Error fetching coin details:", error)
        throw error
    }
}

// Fetch only chart data
export const fetchCoinData = async (id, currency = 'usd', days = '365') => {
    try {
        const res = await fetch(`/api/coins/${id}/chart?currency=${currency}&days=${days}`)

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        return data
    } catch (error) {
        console.error("Error fetching chart data:", error)
        throw error
    }
}

export const fetchTrendingCoins = async () => {


    try {
        const res = await fetch('/api/trending')

        const data = await res.json()

        return data

    } catch (error) {

        console.error("Error fetching coins:", error)
        return []
    }
}