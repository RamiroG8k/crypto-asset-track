export type Option = {
    label: string;
    value: string;
};

export interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
    onValueChange: (value: string) => void;
    options: Option[];
    values?: string[];
};
