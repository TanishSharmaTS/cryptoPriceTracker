export default async function Page({ params }) {
  try {

    const { id } = await params

    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    return (
      <div>
        <h1>{data.name}</h1>
        <h2>{data.symbol}</h2>
        <h3>{data.hashing_algorithm}</h3>
        <p>{data.description?.en}</p>
      </div>
    );
  } catch (err) {
    return <p>Error loading coin</p>;
  }
}