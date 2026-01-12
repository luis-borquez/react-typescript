import { describe, expect, test } from "vitest";
import { render, screen } from '@testing-library/react';
import { CustomHeader } from "./CustomHeader";

describe('CustomHeader', () => {
    const title = 'Test title';
    const description = 'Test description';

    test('should render the title correctly', () => {
        render(<CustomHeader title={title} description={description} />);

        expect(screen.getByText(title)).toBeDefined();
        expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
        expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(title);
    });

    test('should render the description when provided', () => {
        render(<CustomHeader title={title} description={description} />);

        expect(screen.getByText(description)).toBeDefined();
        expect(screen.getByRole('paragraph')).toBeDefined();
        expect(screen.getByRole('paragraph').textContent).toBe(description);
    });
    
    test('should not render the description when not provided', () => {
        const { container } = render(<CustomHeader title={title} />);

        const divElement = container.querySelector('.content-center');
        const p = divElement?.querySelector('p');

        expect(p).toBeNullable();
    });
});
