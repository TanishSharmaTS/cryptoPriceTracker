export async function GET(request, { params }) { 
    try {
        const { id } = await params
        const { searchParams } = new URL(request.url)
        
        const detailsOnly = searchParams.get('details_only') === 'true'
        const currency = searchParams.get('currency') || 'usd'
        const days = searchParams.get('days') || '365'

        if (detailsOnly) {
            const coinRes = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, { next: { revalidate: 300 } })
            const coin = await coinRes.json()
            return Response.json({ coin }, { status: 200 })
        }

        const [coinRes, chartRes] = await Promise.all([
            fetch(`https://api.coingecko.com/api/v3/coins/${id}`, { next: { revalidate: 300 } }),
            fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`, { next: { revalidate: 300 } })
        ])

        const [coin, chart] = await Promise.all([
            coinRes.json(),
            chartRes.json()
        ])

        return Response.json({ coin, chart }, { status: 200 })

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 })
    }
}