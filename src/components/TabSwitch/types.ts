import React from "react";
import { Option } from "../Select/types";

export interface TabSwitchProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onChange'> {
    onChange: (value: string) => void;
    value: string;
    options: Option[];
};
