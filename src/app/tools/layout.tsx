import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Crypto Tools – Live Prices & Market Data | Cryptecho",
    description: "Use Cryptecho’s crypto tools to track live prices, trending coins, and market data powered by CoinGecko.",
};

export default function ToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
