const BASE_URL = "https://api.coingecko.com/api/v3";

export async function getTopCoins(limit = 20) {
    try {
        const res = await fetch(
            `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) throw new Error("Failed to fetch top coins");
        return res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getTrendingCoins() {
    try {
        const res = await fetch(`${BASE_URL}/search/trending`, { next: { revalidate: 300 } });
        if (!res.ok) throw new Error("Failed to fetch trending coins");
        return res.json();
    } catch (error) {
        console.error(error);
        return { coins: [] };
    }
}

export async function getMarketGlobalData() {
    try {
        const res = await fetch(`${BASE_URL}/global`, { next: { revalidate: 300 } });
        if (!res.ok) throw new Error("Failed to fetch global data");
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getSimplePrice(ids: string, vsCurrencies: string) {
    try {
        const res = await fetch(
            `${BASE_URL}/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`,
            { next: { revalidate: 30 } }
        );
        if (!res.ok) throw new Error("Failed to fetch price");
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getCoinDetails(id: string) {
    try {
        const res = await fetch(
            `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) throw new Error("Failed to fetch coin details");
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}
