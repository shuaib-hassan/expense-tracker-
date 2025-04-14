function SearchBar({ searchTerm, onSearchChange }) {
    console.log(onSearchChange);
    return (
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or description..."
        />
      </div>
    );
  }
  
  export default SearchBar;
  