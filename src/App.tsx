import { useState } from 'react';

import './App.css';
import Select from './components/Select';
import { type Option } from './components/Select/types';
import TabSwitch from './components/TabSwitch';
import { IoIosClose } from "react-icons/io";
type TimePeriod = 'week' | 'month' | 'year';

const FIXED_ASSETS: Option[] = [
    {
        label: 'Bitcoin',
        value: 'BTC'
    },
    {
        label: 'Ethereum',
        value: 'ETH'
    },
    {
        label: 'Usdt dollar',
        value: 'USDT'
    }
];

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
]

function App() {
    const [assets, setAssets] = useState<string[]>([]);
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('week');

    return (
        <main className="container space-y-8">
            <h1 className="text-3xl font-medium">Crypto asset tracker</h1>

            <div className="flex flex-col gap-4 items-start bg-white shadow-lg rounded-xl p-4">
                <div className="flex items-center w-full justify-between">
                    <div className="flex gap-2">
                        <div className="flex gap-4">
                            <Select
                                multiple
                                onValueChange={setAssets}
                                options={FIXED_ASSETS}
                                values={assets}
                            />

                            <TabSwitch
                                onChange={value => setTimePeriod(value as TimePeriod)}
                                options={FIXED_TIME_PERIODS}
                                value={timePeriod}
                            />
                        </div>
                    </div>

                    <button className="h-full w-32 border" type="button">
                        Login
                    </button>
                </div>

                <div className="h-6 flex gap-4">
                    {assets.map((asset: string, index: number) => (
                        <button key={index} className="pl-2 pr-1 border border-content/10 flex items-center gap-2 rounded-md shadow-sm">
                            <span className="text-xs">{asset}</span>

                            <IoIosClose className="text-lg" />
                        </button>
                    ))}
                </div>

                <div className="h-[30rem] w-full shadow-sm rounded-xl p-4 border border-content/10">
                    {/*
             * Component to handle the performance comparison by period of time selected
             *
             * <Chart data={[]} />
             * */}
                </div>
            </div>
        </main>
    )
}

export default App
