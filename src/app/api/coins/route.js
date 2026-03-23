export async function GET() {
    try {
        const res = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )
        
        const data = await res.json()
        return Response.json(data)
    } catch (error) {
        console.error("API Error:", error)
        return Response.json(
            { error: "Failed To fetch data" }, 
            { status: 500 }
        );
    }
}