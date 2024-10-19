import { useEffect, useState } from 'react';

import './App.css';
import Select from './components/Select';
import { type Option } from './components/Select/types';
import TabSwitch from './components/TabSwitch';
import { useAssets } from './providers/AssetsProvider/AssetsProvider';
import { IoIosClose } from 'react-icons/io';
import { AssetData } from './api/AssetsAPI/types';
import Chart from './components/Chart';

enum TimePeriod {
    week = 7,
    month = 30,
    year = 365
};

type TimeOptions = keyof typeof TimePeriod;

const FIXED_TIME_PERIODS: Option[] = [
    {
        label: 'Weekly',
        value: 'week'
    },
    {
        label: 'Monthly',
        value: 'month'
    },
    {
        label: 'Yearly',
        value: 'year'
    }
];

type DataForChart = Record<string, number | string>;

const formatDataForChart = (assets: AssetData[]): DataForChart[] => {
    const dateMap = new Map<string, Record<string, number | string>>();

    for (const { id, prices } of assets) {
        for (const [timestamp, price] of prices) {
            const localeDate = new Date(timestamp).toLocaleDateString();

            let dateData = dateMap.get(localeDate);

            if (!dateData) {
                dateData = { date: localeDate };
                dateMap.set(localeDate, dateData);
            }

            dateData[id] = price;
        }
    }

    return Array.from(dateMap.values());
};

const formatLinesForChart = (elements: string[]) => {
    const COLORS = {
        bitcoin: "#F7931A",
        ethereum: "#627EEA",
        binancecoin: "#F3BA2F",
        solana: "#00FFA3",
        tron: "#FF0013",
        'the-open-network': "#0098ea",
        cardano: "#0033AD",
        avalanche: "#E84142",
        bitcoin_cash: "#8DC351",
        near: "#000000",
    }

    return elements.map(key => ({
        key,
        color: COLORS[key as keyof typeof COLORS]
    }));
}

function App() {
    const { assets, loadAssetData } = useAssets();

    const [chartData, setChartData] = useState<AssetData[]>([]);
    const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
    const [period, setPeriod] = useState<TimeOptions>('week');

    const handleValueChange = async (value: string) => {
        if (selectedAssets?.includes(value)) {
            setSelectedAssets(prev => prev.filter(item => item !== value));
        } else {
            setSelectedAssets(prev => [...prev, value]);
        }
    };

    const assetsAsOptions = () => assets.map(({ id, symbol, name }) => ({
        label: `${name} (${symbol})`,
        value: id
    } as Option));

    const loadAllData = async () => {
        const promises = selectedAssets.map(assetId => loadAssetData(assetId, TimePeriod[period]));

        const results = await Promise.all(promises) as AssetData[];

        setChartData(results);
    };

    useEffect(() => {
        loadAllData();
    }, [selectedAssets, period]);

    return (
        <main className="container space-y-8">
            <h1 className="text-3xl font-medium">Crypto asset tracker</h1>

            <div className="flex flex-col gap-3 items-start bg-white shadow-lg rounded-xl p-4">
                <div className="flex items-center w-full justify-between">
                    <div className="flex gap-2">
                        <div className="flex gap-4">
                            <Select
                                multiple
                                onValueChange={handleValueChange}
                                options={assetsAsOptions()}
                                values={selectedAssets}
                            />

                            <TabSwitch
                                onChange={value => setPeriod(value as TimeOptions)}
                                options={FIXED_TIME_PERIODS}
                                value={period}
                            />
                        </div>
                    </div>

                    <button className="h-full w-32 border" type="button">
                        Login
                    </button>
                </div>

                <div className="h-6 flex gap-2">
                    {selectedAssets.map((asset: string, index: number) => (
                        <button
                            key={index}
                            className="pl-2 pr-0.5 border border-content/10 flex items-center gap-2 rounded-md shadow-sm group"
                            onClick={() => handleValueChange(asset)}
                        >
                            <span className="text-xs">{asset}</span>

                            <IoIosClose className="text-lg group-hover:bg-red-500/30 rounded-md transition-colors" />
                        </button>
                    ))}
                </div>

                <div className="h-[30rem] w-full shadow-sm rounded-xl p-4 border border-content/10">
                    <Chart<DataForChart> data={formatDataForChart(chartData)} lines={formatLinesForChart(selectedAssets)} />
                </div>
            </div>
        </main>
    )
}

export default App
