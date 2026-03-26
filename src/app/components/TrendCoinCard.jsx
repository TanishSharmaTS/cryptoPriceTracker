export default function TrendCoinCard({ name, symbol, market_cap_rank, small, price, market_cap }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "8px", margin: "6px 0" }}>
      <p>{name}</p>
      <p>Symbol {symbol}</p>
      <img src={small} alt={name} width={32} height={32} />
      <p>Market Cap Rank: {market_cap_rank}</p>
      <p>Market Cap: {market_cap}</p>
      <p>Price: ${price}</p>
    </div>
  );
}