import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ItemCounter } from "./ItemCounter";

describe('ItemCounter', () => { 
    test('should render with default values', () => {
        const itemName = 'foo item';

        render(<ItemCounter name={ itemName } />);

        expect(screen.getByText(itemName)).toBeDefined();
        expect(screen.getByText(itemName)).not.toBeNull();
    });

    test('should render with custom quantity', () => {
        const itemName = 'foo item';
        const itemQuantity = 17;

        render(<ItemCounter name={ itemName } quantity={ itemQuantity } />);

        expect(screen.getByText(itemQuantity)).toBeDefined();
    });

    test('should increase count when +1 button is pressed', () => {
        render(<ItemCounter name="Test item"  quantity={ 1 } />);
        const [, buttonAdd] = screen.getAllByRole('button');

        fireEvent.click(buttonAdd);
        
        expect(screen.getByText('2')).toBeDefined();
    });

    test('should decrease count when -1 button is pressed', () => {
        render(<ItemCounter name="Test item"  quantity={ 5 } />);
        const [buttonSubtract] = screen.getAllByRole('button');

        fireEvent.click(buttonSubtract);
        
        expect(screen.getByText('4')).toBeDefined();
    });

    test('should not decrease count when -1 button is pressed and quantity is 1', () => {
        render(<ItemCounter name="Test item"  quantity={ 1 } />);
        const [buttonSubtract] = screen.getAllByRole('button');

        fireEvent.click(buttonSubtract);
        
        expect(screen.getByText('1')).toBeDefined();
    });

    test('should change text to red when count is 1', () => {
        const name = 'Test item';
        const quantity = 1;
        render(<ItemCounter name={ name }  quantity={ quantity } />);

        const itemText = screen.getByText(name);

        expect(itemText.style.color).toBe('red');
    });

    test('should change text to black when count is greater than 1', () => {
        const name = 'Test item';
        const quantity = 2;
        render(<ItemCounter name={ name }  quantity={ quantity } />);

        const itemText = screen.getByText(name);

        expect(itemText.style.color).toBe('black');
    });
});
