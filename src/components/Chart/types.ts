export type ChartProps<T> = {
    data: T[];
    lines: {
        key: keyof T;
        color: string;
    }[];
};
