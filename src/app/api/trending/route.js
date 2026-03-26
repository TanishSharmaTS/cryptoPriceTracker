export async function GET() {

    try {

        const response = await fetch('https://api.coingecko.com/api/v3/search/trending')


        const data = await response.json()

        return Response.json({data, status:200})

    } catch (error) {
        console.log(error)
        return Response.json({error, status:500})
    }
}