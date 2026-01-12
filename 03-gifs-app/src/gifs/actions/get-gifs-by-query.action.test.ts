import AxiosMockAdapter from "axios-mock-adapter";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { getGifsByQuery } from "./get-gifs-by-query.action";
import { giphyApi } from "../api/giphy.api";

import { mockGiphySearchResponse } from "../../../tests/mocks/giphy.response.data";

describe('getGifsByQuery', () => {
    let mock = new AxiosMockAdapter(giphyApi);


    beforeEach(() => {
        // mock.reset(); // regresa la instancia del mock a su estado inicial
        mock = new AxiosMockAdapter(giphyApi);
    });

    // test('should return a list of gifs', async () => { 
    //     const gifs = await getGifsByQuery('hello world');
    //     const [gif1] = gifs;        

    //     expect(gifs.length).toBe(10);

    //     expect(gif1).toStrictEqual({
    //         id: expect.any(String),
    //         title: expect.any(String),
    //         height: expect.any(Number),
    //         width: expect.any(Number),
    //         url: expect.any(String)
    //     });
    //  });

    test('should return a list of gifs', async () => {
        mock.onGet('/search').reply(200, mockGiphySearchResponse);

        const gifs = await getGifsByQuery('hello world');

        expect(gifs.length).toBe(10);

        gifs.forEach((gif) => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.height).toBe('number');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.url).toBe('string');
        });
    });

    test('should return an empty list if query is not provided', async () => {
        // mock.onGet('/search').reply(200, { data: [] });
        mock.restore(); // Desecha el mock y restaura la instancia real de axios

        const gifs = await getGifsByQuery('');

        expect(gifs.length).toBe(0);
    });

    test('should handle error when API return an error', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error')
            .mockImplementation(() => { });

        mock.onGet('/search').reply(400, {
            data: {
                status: 400,
                message: 'Bad Request'
            }
        });

        const gifs = await getGifsByQuery('hello');

        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error: Request failed with status code 400');
    });
});
