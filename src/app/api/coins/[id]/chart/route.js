export async function GET(request, { params }) { 
    try {
        const { id } = await params
        const { searchParams } = new URL(request.url)
        
        const currency = searchParams.get('currency') || 'usd'
        const days = searchParams.get('days') || '365'

        const chartRes = await fetch(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`, 
            { next: { revalidate: 300 } }
        )
        
        const chart = await chartRes.json()
        return Response.json({ chart }, { status: 200 })

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 })
    }
}