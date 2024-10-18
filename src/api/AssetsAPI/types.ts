export type Asset = {
    id: string;
    symbol: string;
    name: string;
};

type Period = [
    date: number,
    value: number
];

export type AssetData = {
    id: string;
    prices: Period[];
    market_caps: Period[];
    total_volumes: Period[];
};
