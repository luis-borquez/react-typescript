import { CustomHeader, SearchBar } from "./shared/components";
import { PreviousSearches, GifList } from "./gifs/components";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
    const { currentTopic, gifs, searchedTerms, handleSearch, handleTermClicked } = useGifs();

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
            <GifList topic={currentTopic} gifs={gifs} />
        </>
    );
}
