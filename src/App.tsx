import { useState } from 'react';

import './App.css';
import Select from './components/Select';
import { type Option } from './components/Select/types';

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

function App() {
    const [assets, setAssets] = useState<string[]>([]);
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('week');

    return (
        <main className="container">
            <h1>Crypto asset tracker</h1>

            <div className="center">
                <Select
                    multiple
                    onValueChange={setAssets}
                    options={FIXED_ASSETS}
                    values={assets}
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
