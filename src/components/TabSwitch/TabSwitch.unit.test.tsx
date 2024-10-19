import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';

import TabSwitch from './TabSwitch';
import { TabSwitchProps } from './types';

const onChangeMock = vi.fn();

const defaultOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
];

const renderTabSwitch = (props?: Partial<TabSwitchProps>) => render(
    <TabSwitch onChange={onChangeMock} options={defaultOptions} {...props} />
);

describe('Select Component', () => {

    it('should render with default props', () => {
        renderTabSwitch();

        const options = screen.getAllByRole('button');

        expect(options).toHaveLength(3);
    });

    it('should call onChange when an option is selected', () => {
        renderTabSwitch();

        fireEvent.click(screen.getByText('Option 2'));

        expect(onChangeMock).toHaveBeenCalledWith('option2');
    });

    it('should highlight selected values', () => {
        renderTabSwitch({ value: 'option2' });

        const firstOption = screen.getByText('Option 1').closest('button');
        const secondOption = screen.getByText('Option 2').closest('button');

        expect(firstOption).not.toHaveClass('bg-primary/20');
        expect(secondOption).toHaveClass('bg-primary/15');
    });

    it('should handle empty options array', () => {
        render(<TabSwitch onChange={() => { }} options={[]} />);

        expect(screen.queryByRole('button', { name: /Option/i })).toBeNull();
    });
});