interface Props {
    searches: string[];
    onLabelClicked: (term: string) => void;
}

export const PreviousSearches = ({ searches, onLabelClicked }: Props) => {
    return (
        <div className="previous-searches">
            <h2>Búsquedas previas</h2>

            <ul className="previous-searches-list">
                {
                    searches.map((searchTerm) => (
                        <li 
                            key={searchTerm}
                            onClick={ () => onLabelClicked(searchTerm) }
                        >{searchTerm}</li>
                    ))
                }
            </ul>
        </div>
    );
}
