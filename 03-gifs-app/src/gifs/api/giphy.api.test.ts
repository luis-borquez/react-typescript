import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

// Testing de instancia de Axios
describe('giphyApi', () => {
    test('should be configured with correct properties', () => {
        const { baseURL, params } = giphyApi.defaults;

        expect(baseURL).toBe('https://api.giphy.com/v1/gifs');
        expect(params).toStrictEqual({
            lang: 'es',
            api_key: import.meta.env.VITE_GIPHY_API_KEY
        });
    });
});
