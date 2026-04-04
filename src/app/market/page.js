import CoinList from "../components/CoinList";

export default function Market() {
    const styles = {
        main: {
            minHeight: "100vh",
            backgroundColor: "var(--bg-base)",
            backgroundImage: `
                radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212, 175, 55, 0.06) 0%, transparent 60%),
                radial-gradient(ellipse 40% 40% at 90% 80%, rgba(76, 201, 176, 0.04) 0%, transparent 60%)
            `,
            fontFamily: "var(--text-display)",
            color: "var(--text-primary)",
            padding: "2rem",
        },
    };

    return (
        <main style={styles.main}>
            <CoinList />
        </main>
    );
}