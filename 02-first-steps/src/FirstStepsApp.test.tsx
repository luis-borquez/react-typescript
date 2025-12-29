import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FirstStepsApp } from "./FirstStepsApp";

// componente ficticio para simular el ItemCounter real
const mockItemCounter = vi.fn((props: unknown) => {
    return (<div data-testid="item-counter-mock" />)
});

vi.mock('./shopping-cart/ItemCounter', () => ({
    ItemCounter: (props: unknown) => mockItemCounter(props)
}));

// vi.mock('./shopping-cart/ItemCounter', () => ({
//     ItemCounter: (props: unknown) => 
//     <div 
//         data-testid="item-counter-mock" 
//         name={ props.name }
//         quantity={ props.quantity }
//     />
// }));

describe('FirstStepsApp', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should match snapshot', () => {
        const { container } = render(<FirstStepsApp />);

        expect(container.innerHTML).toMatchSnapshot();
    });

    test('should render the correct amount of ItemCounter components', () => {
        render(<FirstStepsApp />);

        const itemCounters = screen.getAllByTestId('item-counter-mock');

        expect(itemCounters.length).toBe(4);
    });

    test('should render ItemCounter with props', () => {
        render(<FirstStepsApp />);

        expect(mockItemCounter).toHaveBeenCalledTimes(4);
        expect(mockItemCounter).toHaveBeenCalledWith({
            name: expect.any(String),
            quantity: expect.any(Number)
        });
    });
});
