export type LineProps<T> = {
    key: keyof T;
    color: string;
}

export type ChartProps<T = Record<string, number | string>> = {
    data: T[];
    lines: LineProps<T>[];
};
