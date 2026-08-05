import "./SearchBar.css";

function SearchBar()
{
    return (
        <div className="search-bar">
            <input className="input-search" type="text" placeholder="Buscar servicios o barberos..." />

            <button className="  search-btn"><i className="bi bi-search"></i></button>
        </div>
    );
}

export default SearchBar;