import { useEffect, useState, type KeyboardEvent } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = 'Buscar', onQuery }: Props) => {
  const [query, setQuery] = useState('');

  // Implementación de Debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [query, onQuery]);

  const handleSearch = () => {
    if (query === '') return;

    onQuery(query);
    setQuery('');
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}
