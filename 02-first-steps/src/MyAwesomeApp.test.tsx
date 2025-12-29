import { describe, expect, test } from "vitest";
import { render, screen } from '@testing-library/react';

import { MyAwesomeApp } from "./MyAwesomeApp";

// Pruebas sobre componentes / buscar elementos en componente renderizado / snapshots
describe('MyAwesomeApp', () => {
    test('should render firstName and lastName', () => {
        const { container } = render(<MyAwesomeApp />);
        // screen.debug();
        
        const h1 = container.querySelector('h1');
        expect(h1?.innerHTML).toContain('Luis Fernando');

        const h3 = container.querySelector('h3');
        expect(h3?.innerHTML).toContain('Bórquez');
    });

    test('should render firstName and lastName - screen', () => {
        render(<MyAwesomeApp />);
        // screen.debug();
        
        // const h1 = screen.getByRole('heading', { level: 1 });
        const h1 = screen.getByTestId('first-name-title');
        
        expect(h1.innerHTML).toContain('Luis Fernando')
    });

    test('should match snapshot - screen', () => {
        render(<MyAwesomeApp />);

        expect(screen.getByTestId('div-app')).toMatchSnapshot();
    });
});
