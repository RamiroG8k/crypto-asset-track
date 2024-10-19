import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartProps } from './types';

const Chart = <T extends Record<string, number | string>>({ data, lines }: ChartProps<T>) => (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
            <XAxis dataKey="date" scale="auto" />

            <YAxis />

            <Tooltip />

            <Legend />

            {lines.map(({ color, key }) => (
                <Line
                    key={String(key)}
                    type="monotone"
                    dataKey={String(key)}
                    stroke={color}
                    name={`${String(key)} Price`}
                />
            ))}
        </LineChart>
    </ResponsiveContainer>
);

export default Chart;
