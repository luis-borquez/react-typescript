import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

// Testing en hooks
describe('useCounter', () => {
    const initialValue = 10;

    test('should initialize with default value of 1', () => {
        const { result } = renderHook(() => useCounter());

        expect(result.current.counter).toBe(1);
    });

    test('should initialize with custom value if provided', () => {
        const { result } = renderHook(() => useCounter(initialValue));

        expect(result.current.counter).toBe(initialValue);
    });

    test('should increment counter when handleAdd is called', () => {
        const { result } = renderHook(() => useCounter(initialValue));

        act(() => {
            result.current.handleAdd();
        });

        expect(result.current.counter).toBe(initialValue + 1);
    });

    test('should decrement counter when handleSubtract is called', () => {
        const { result } = renderHook(() => useCounter(initialValue));

        act(() => {
            result.current.handleSubtract();
        });

        expect(result.current.counter).toBe(initialValue - 1);
    });

    test('should reset counter to initial value when handleReset is called', () => {
        const { result } = renderHook(() => useCounter(initialValue));

        act(() => {
            result.current.handleAdd();
        });
        expect(result.current.counter).not.toBe(initialValue);

        act(() => {
            result.current.handleReset();
        });
        expect(result.current.counter).toBe(initialValue);
    });
});
