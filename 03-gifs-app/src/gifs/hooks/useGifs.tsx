import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

// const gifsCache: {[key: string]: Gif[]} = {};
// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
    const [currentTopic, setCurrentTopic] = useState<string>('');
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [searchedTerms, setSearchedTerms] = useState<string[]>([]);

    // const gifsCache = useRef<{[key: string]: Gif[]}>({});
    const gifsCache = useRef<Record<string, Gif[]>>({});

    const handleTermClicked = async (term: string) => {
        setCurrentTopic(term);

        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }

        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
        gifsCache.current[term] = gifs;
    }

    const handleSearch = async (query: string) => {
        const cleanedQuery = query.toLocaleLowerCase().trim();
        if (cleanedQuery === '') return;

        setCurrentTopic(cleanedQuery);
        if (searchedTerms.includes(cleanedQuery)) {
            setGifs(gifsCache.current[cleanedQuery]);
            return;
        }

        setSearchedTerms((prevTerms) => [cleanedQuery, ...prevTerms].slice(0, 8));

        const gifs = await getGifsByQuery(cleanedQuery);
        setGifs(gifs);

        gifsCache.current[cleanedQuery] = gifs;
    }

    return {
        // Properties
        currentTopic,
        gifs,
        searchedTerms,

        // Methods
        handleSearch,
        handleTermClicked,
    };
}
