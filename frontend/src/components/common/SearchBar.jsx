import "./SearchBar.css";

function SearchBar({ title, value, onChange, onSearch }) {
    return (
        <div className="search-bar">
            <input
                className="input-search"
                type="text"
                placeholder={title}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSearch();
                    }
                }}
            />

            <button
                className="search-btn"
                type="button"
                onClick={onSearch}
            >
                <i className="bi bi-search"></i>
            </button>
        </div>
    );
}

export default SearchBar;