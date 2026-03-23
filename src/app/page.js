import CoinList from "./components/CoinList";

export default function Home() {
    return (
        <main style={{ padding: "20px" }}>
            <h1>Crypto Price Tracker</h1>
            <CoinList />
        </main>
    );
}