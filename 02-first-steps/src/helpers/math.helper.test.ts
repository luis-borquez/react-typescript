import { describe, expect, test } from 'vitest';
import { add, multiply, subtract } from './math.helper';

// Introducción a las pruebas / primeras pruebas automáticas
describe('add', () => {
    test('should add two positive numbers', () => {
        // ! 1. Arrange
        const a = 1;
        const b = 2;

        // ! 2. Act
        const result = add(a, b);
        
        // ! 3. Assert
        expect(result).toBe(a + b);
    });

    test('should add two negative numbers', () => {
        // ! 1. Arrange
        const a = -1;
        const b = -2;

        // ! 2. Act
        const result = add(a, b);
        
        // ! 3. Assert
        expect(result).toBe(a + b);
    });
});

describe('subtract', () => {
    test('should subtract two numbers', () => {
        const a = 10;
        const b = 2;

        const result = subtract(a, b);
        
        expect(result).toBe(a - b);
    });
});

describe('multiply', () => {
    test('should multiply two numbers', () => {
        const a = 5;
        const b = 4;

        const result = multiply(a, b);
        
        expect(result).toBe(a * b);
    });

    test('should multiply two negative numbers', () => {
        const a = -5;
        const b = -4;

        const result = multiply(a, b);
        
        expect(result).toBe(a * b);
    });

    test('should multiply by zero and result must be zero', () => {
        const a = 5;
        const b = 0;

        const result = multiply(a, b);        

        expect(result).toBe(0);
    });
});
