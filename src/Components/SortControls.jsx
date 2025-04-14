function SortControls({ sortBy, sortOrder, onSortChange, onOrderToggle }) {
    return (
      <div className="sort-controls">
        <label htmlFor="sort-by">Sort by:</label>
        <select id="sort-by" value={sortBy} onChange={onSortChange}>
          <option value="category">Category</option>
          <option value="description">Description</option>
        </select>
  
        <button onClick={onOrderToggle}>
          Sort {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
        </button>
      </div>
    );
  }
  
  export default SortControls;
  