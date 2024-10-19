import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';

import Select from './Select';
import { SelectProps } from './types';

const onChangeMock = vi.fn();

const mockOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
];

const renderSelect = (props?: Partial<SelectProps>) => render(
    <Select onValueChange={onChangeMock} options={mockOptions} {...props} />
);

describe('Select', () => {
    it('should render with default props', () => {
        renderSelect();

        const selectButton = screen.getByText('Seleccionar');
        const options = screen.getAllByRole('button');

        expect(selectButton).toBeTruthy();
        expect(options).toHaveLength(4);
    });

    it('should display options when clicked', () => {
        renderSelect();

        fireEvent.click(screen.getByText('Seleccionar'));

        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('should call onValueChange when an option is selected', () => {
        renderSelect();

        fireEvent.click(screen.getByText('Seleccionar'));
        fireEvent.click(screen.getByText('Option 2'));

        expect(onChangeMock).toHaveBeenCalledWith('option2');
    });

    it('should highlight selected values', () => {
        renderSelect({ values: ['option2'] });

        fireEvent.click(screen.getByText('Seleccionar'));

        const firstOption = screen.getByText('Option 1').closest('button');
        const secondOption = screen.getByText('Option 2').closest('button');

        expect(firstOption).not.toHaveClass('bg-primary/15');
        expect(secondOption).toHaveClass('bg-primary/15');
    });

    it('should handle empty options array', () => {
        renderSelect ({ options: [] });

        fireEvent.click(screen.getByText('Seleccionar'));

        expect(screen.queryByRole('button', { name: /Option/i })).toBeNull();
    });
});