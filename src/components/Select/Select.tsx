import { useState } from 'react';
import { SelectProps } from './types';
import { cn } from '../../utils/cn';

const Select: React.FC<SelectProps> = ({ onValueChange, options, values = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={cn(
                'flex flex-col w-64 h-10 relative text-content shadow-sm',
                isOpen ? 'overflow-visible rounded-t-lg' : 'overflow-hidden rounded-lg'
            )}
        >
            <button
                className="h-full center z-50 bg-white rounded-lg border border-content/10"
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
            >
                Seleccionar
            </button>

            <div className={cn(
                'z-40 border border-content/10 absolute flex flex-col p-1.5 pt-4 gap-2 transition-all duration-300 bg-white w-full translate-y-8 overflow-y-scroll',
                isOpen ? 'max-h-64 opacity-100 rounded-b-lg' : 'max-h-0 opacity-0'
            )}>
                {options && options.map(({ label, value }) => (
                    <button
                        className={cn(
                            'px-4 py-1 text-left border border-content/10 rounded-lg',
                            values.includes(value) && 'bg-primary/15'
                        )}
                        key={value}
                        onClick={() => onValueChange(value)}
                        type="button"
                        value={value}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Select