import "./SearchBar.css";

function SearchBar({title})
{
    return (
        <div className="search-bar">
            <input className="input-search" type="text" placeholder={title} />

            <button className="  search-btn"><i className="bi bi-search"></i></button>
        </div>
    );
}

export default SearchBar;