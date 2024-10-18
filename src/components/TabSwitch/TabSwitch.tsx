import { TabSwitchProps } from "./types"
import { cn } from '../../utils/cn';

const TabSwitch: React.FC<TabSwitchProps> = ({ value: selected, options, onChange }) => {
    return (
        <div className={cn(
            'border border-content/10 flex p-1.5 gap-2 transition-all duration-300 bg-background w-72 rounded-lg'
        )}>
            {options && options.map(({ label, value }) => (
                <button
                    className={cn(
                        "h-full border border-content/10 rounded-lg w-full",
                        selected === value && 'bg-primary/20'
                    )}
                    key={value}
                    onClick={() => onChange(value)}
                    type="button"
                    value={value}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}

export default TabSwitch