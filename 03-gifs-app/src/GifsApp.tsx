import { useState } from "react";

import { CustomHeader, SearchBar } from "./shared/components";
import { PreviousSearches, GifList } from "./gifs/components";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [searchedTerms, setSearchedTerms] = useState<string[]>([]);

    const handleTermClicked = (term: string) => {
        console.log({ term });
    }

    const handleSearch = async (query: string) => {
        const formattedQuery = query.toLocaleLowerCase().trim();
        if (formattedQuery === '') return;
        if (searchedTerms.includes(formattedQuery)) return;

        setSearchedTerms([formattedQuery, ...searchedTerms].slice(0, 8));

        const gifs = await getGifsByQuery(query);
        setGifs(gifs);
    }

    return (
        <>
            {/* Header */}
            <CustomHeader
                title="Buscador de Gifs"
                description="Descubre y comparte el GIF perfecto!"
            />

            {/* Search */}
            <SearchBar 
                placeholder="Buscar gifs..."
                onQuery={handleSearch}
            />

            {/* Búsquedas previas */}
            <PreviousSearches
                searches={searchedTerms}
                onLabelClicked={handleTermClicked}
            />

            {/* Gifs */}
            <GifList gifs={gifs} />
        </>
    );
}
