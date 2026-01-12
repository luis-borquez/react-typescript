import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifsActions from "../actions/get-gifs-by-query.action";

describe('useGifs', () => {
    const query = 'hello';

    test('should return default values and methods', () => {
        const { result } = renderHook(() => useGifs());

        expect(result.current.currentTopic).toBe('');
        // expect(result.current.gifs.length).toBe(0);
        expect(result.current.gifs).toStrictEqual([]);
        // expect(result.current.searchedTerms.length).toBe(0);
        expect(result.current.searchedTerms).toStrictEqual([]);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClicked).toBeDefined();
    });

    test('should return a list of gifs', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleSearch(query);
        });

        expect(result.current.gifs.length).toBe(10);
    });

    test('should return a list of gifs when handleTermClicked is called', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked(query);
        });

        expect(result.current.gifs.length).toBe(10);
    });

    test('should return a list of gifs from cache when handleTermClicked is called with a repeated term', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleSearch(query);
        });

        expect(result.current.gifs.length).toBe(10);

        await act(async () => {
            await result.current.handleSearch('goodbye');
        });

        expect(result.current.gifs.length).toBe(10);

        const getGifsByQuerySpy = vi.spyOn(gifsActions, 'getGifsByQuery');

        await act(async () => {
            await result.current.handleTermClicked(query);
        });

        expect(getGifsByQuerySpy).not.toHaveBeenCalled();
        getGifsByQuerySpy.mockRestore();
    });

    test('should return a list of gifs from cache when handleSearch is called with a repeated term', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleSearch(query);
        });

        expect(result.current.gifs.length).toBe(10);

        await act(async () => {
            await result.current.handleSearch('goodbye');
        });

        expect(result.current.gifs.length).toBe(10);

        const getGifsByQuerySpy = vi.spyOn(gifsActions, 'getGifsByQuery');
        getGifsByQuerySpy.mockReset();

        await act(async () => {
            await result.current.handleSearch(query);
        });

        expect(getGifsByQuerySpy).not.toHaveBeenCalled();
        getGifsByQuerySpy.mockRestore();
    });

    test('should return no more than 8 previous terms', async () => {
        const { result } = renderHook(() => useGifs());

        vi.spyOn(gifsActions, 'getGifsByQuery').mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('1');
            await result.current.handleSearch('2');
            await result.current.handleSearch('3');
            await result.current.handleSearch('4');
            await result.current.handleSearch('5');
            await result.current.handleSearch('6');
            await result.current.handleSearch('7');
            await result.current.handleSearch('8');
            await result.current.handleSearch('9');
            await result.current.handleSearch('10');
        });

        expect(result.current.searchedTerms.length).toBe(8);
        expect(result.current.searchedTerms).toStrictEqual([
            '10',
            '9',
            '8',
            '7',
            '6',
            '5',
            '4',
            '3'
        ]);
    });
});
