import { TabSwitchProps } from "./types"
import { cn } from '../../utils/cn';

const TabSwitch: React.FC<TabSwitchProps> = ({ value: selected, options, onChange }) => {
    return (
        <div className={cn(
            'border border-content/10 flex p-1.5 gap-2 transition-all duration-300 bg-white h-full w-72 rounded-lg shadow-sm'
        )}>
            {options && options.map(({ label, value }) => (
                <button
                    className={cn(
                        "h-full border rounded-lg w-full transition-all",
                        selected === value ? 'bg-primary/15 border-content/10' : 'text-content/70 border-transparent'
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