export const fetchCoins = async () => {
    try {
        const res = await fetch("/api/coins")
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const data = await res.json()
        return data
    } catch (error) {
        console.error("Error fetching coins:", error)
        return []
    }
}
