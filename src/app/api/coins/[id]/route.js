export async function GET(request, {params}) {

    try {

        const { id } = await params
        console.log(id)

        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, { next: { revalidate: 300 } })

        const data = await res.json()

        console.log(data)
        return Response.json({ data }, { status: 200 })

    } catch (error) {

        return Response.json({ status: 500 })
    }

}