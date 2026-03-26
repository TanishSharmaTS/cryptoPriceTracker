export async function GET(request, {params}) {

    try {

        const { id } =  await params

        const [coinRes, chartRes] = await Promise.all([
            fetch(`https://api.coingecko.com/api/v3/coins/${id}`, { next: { revalidate: 300 } }),
            fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`, {next: { revalidate: 300 }})
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