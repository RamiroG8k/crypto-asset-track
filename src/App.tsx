import { useState } from 'react';

import './App.css';
import Select from './components/Select';
import { type Option } from './components/Select/types';
import TabSwitch from './components/TabSwitch';

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
        <main className="container">
            <h1>Crypto asset tracker</h1>

            <div className="flex gap-2">
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


            {/*
             * Component to handle the state of the performance comparison
             *
             * <Switch onChange={value => {}} options={['week', 'month', 'year']} value={timePeriod} />
             * * */}

            {/*
             * Component to handle the performance comparison by period of time selected
             *
             * <Chart data={[]} />
             * */}
        </main>
    )
}

export default App
