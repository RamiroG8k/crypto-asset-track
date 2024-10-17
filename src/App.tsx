import { useState } from 'react';

import './App.css';

type TimePeriod = 'week' | 'month' | 'year';

function App() {
    const [assets, setAssets] = useState([]);
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('week');

    return (
        <main className="container">
            <h1>Crypto asset tracker</h1>

            {/**
             * Component to load asset symbols, it can be populated from a list or from the user's assets
             *
             * Nice to have: multiple selection to compare between one or more asset
             *
             * <CustomSelect onChange={value => {}} options={[{ label: '', value: '' }]} value={assets} />
             *  */}

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
