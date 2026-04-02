export async function GET(request, {params, query}) {

    try {

        const { id } =  await params
        const { searchParams } = new URL(request.url)

        let currency = searchParams.get('currency') || 'usd'
        let days = searchParams.get('days') || '365'

        const [coinRes, chartRes] = await Promise.all([
            fetch(`https://api.coingecko.com/api/v3/coins/${id}`, { next: { revalidate: 300 } }),
            fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`, {next: { revalidate: 300 }})
        ])

        const [coin, chart] = await Promise.all([
            coinRes.json(),
            chartRes.json()
        ])

        return Response.json({coin, chart}, { status: 200 })

    } catch (error) {

        return Response.json({ status: 500 })
    }

}