import React from "react";

const CATEGORIES = [
  "All",
  "Design & UX",
  "Programming",
  "Business & Management",
  "Recruitment",
  "Self Help",
  "History",
  "Football",
  "Science",
  "Novel"
];

const SORTS = [
  "Newest",
  "Oldest",
  "Highest Rating",
  "Lowest Rating",
  "Price: Low to High",
  "Price: High to Low",
  "A-Z",
  "Z-A"
];

function SearchFilterRow({ search, setSearch, selectedCategory, setSelectedCategory, sortBy, setSortBy, onReset }) {
  return (
    <div className="search-filter-row">
      
      {/* Search Input */}
      <div className="search-wrap">
        <span className="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          id="search-input"
          type="text"
          className="search-input"
          placeholder="Search by title, author or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch("")}>✕</button>
        )}
      </div>

      {/* Right Filters */}
      <div className="filter-right">
        {/* Category */}
        <select
          id="category-select"
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          id="sort-select"
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {SORTS.map((sort) => (
            <option key={sort} value={sort}>Sort by: {sort}</option>
          ))}
        </select>

        {/* Reset Filters Only */}
        <button className="btn-reset-filters" onClick={onReset}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
      </div>

    </div>
  );
}

export default SearchFilterRow;
