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
        if (gifsCache.current[term]) {
            setCurrentTopic(term);
            setGifs(gifsCache.current[term]);
            return;
        }

        setCurrentTopic(term);
        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
    }

    const handleSearch = async (query: string) => {
        const cleanedQuery = query.toLocaleLowerCase().trim();
        if (cleanedQuery === '') return;
        if (searchedTerms.includes(cleanedQuery)) return;

        setSearchedTerms([cleanedQuery, ...searchedTerms].slice(0, 8));

        const gifs = await getGifsByQuery(query);
        setGifs(gifs);
        setCurrentTopic(query);

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
