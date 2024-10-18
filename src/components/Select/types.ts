export type Option = {
    label: string;
    value: string;
};

export interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
    multiple?: boolean;
    onValueChange: (values: string[]) => void;
    options: Option[];
    values: string[];
};
