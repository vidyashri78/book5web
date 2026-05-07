import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react';
import BookCard from '../components/BookCard';
import { books, genres } from '../data/books';
import './Browse.css';

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $10', min: 0, max: 10 },
  { label: '$10 – $15', min: 10, max: 15 },
  { label: '$15 – $20', min: 15, max: 20 },
  { label: 'Over $20', min: 20, max: Infinity },
];

const FORMATS = ['All', 'Print', 'eBook'];
const LANGUAGES = ['All', 'English', 'Spanish', 'French', 'German'];
const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'title', label: 'Title A–Z' },
];

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || 'All');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // Sync genre from URL
  useEffect(() => {
    const g = searchParams.get('genre');
    if (g) setSelectedGenre(g);
    const s = searchParams.get('search');
    if (s) setSearchQuery(s);
  }, [searchParams]);

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
      );
    }

    if (selectedGenre && selectedGenre !== 'All') {
      result = result.filter(b => b.genre === selectedGenre);
    }

    const range = PRICE_RANGES[selectedPrice];
    result = result.filter(b => b.price >= range.min && b.price <= range.max);

    if (selectedFormat !== 'All') {
      result = result.filter(b => b.format.includes(selectedFormat));
    }

    if (selectedLanguage !== 'All') {
      result = result.filter(b => b.language === selectedLanguage);
    }

    // Sort
    switch (sortBy) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'title': result.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: break;
    }

    return result;
  }, [searchQuery, selectedGenre, selectedPrice, selectedFormat, selectedLanguage, sortBy]);

  const clearFilters = () => {
    setSelectedGenre('All');
    setSelectedPrice(0);
    setSelectedFormat('All');
    setSelectedLanguage('All');
    setSortBy('default');
    setSearchQuery('');
    setSearchParams({});
  };

  const activeFilterCount = [
    selectedGenre !== 'All',
    selectedPrice !== 0,
    selectedFormat !== 'All',
    selectedLanguage !== 'All',
  ].filter(Boolean).length;

  const SkeletonCard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div className="skeleton" style={{ aspectRatio: '2/3', borderRadius: 'var(--radius-md)' }} />
      <div className="skeleton" style={{ height: 14, width: '80%', borderRadius: 4 }} />
      <div className="skeleton" style={{ height: 12, width: '55%', borderRadius: 4 }} />
      <div className="skeleton" style={{ height: 14, width: '40%', borderRadius: 4 }} />
    </div>
  );

  const Sidebar = () => (
    <aside className={`browse-sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>Filters</h3>
        {activeFilterCount > 0 && (
          <button className="clear-filters" onClick={clearFilters}>
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Genre */}
      <div className="filter-group">
        <h4 className="filter-label">Genre</h4>
        <div className="filter-options genre-options">
          {['All', ...genres.map(g => g.name)].map(g => (
            <button
              key={g}
              className={`filter-chip ${selectedGenre === g ? 'active' : ''}`}
              onClick={() => setSelectedGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="filter-group">
        <h4 className="filter-label">Price Range</h4>
        <div className="filter-options">
          {PRICE_RANGES.map((range, i) => (
            <button
              key={i}
              className={`filter-chip ${selectedPrice === i ? 'active' : ''}`}
              onClick={() => setSelectedPrice(i)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Format */}
      <div className="filter-group">
        <h4 className="filter-label">Format</h4>
        <div className="filter-options">
          {FORMATS.map(f => (
            <button
              key={f}
              className={`filter-chip ${selectedFormat === f ? 'active' : ''}`}
              onClick={() => setSelectedFormat(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="filter-group">
        <h4 className="filter-label">Language</h4>
        <div className="filter-options">
          {LANGUAGES.map(l => (
            <button
              key={l}
              className={`filter-chip ${selectedLanguage === l ? 'active' : ''}`}
              onClick={() => setSelectedLanguage(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );

  return (
    <div className="page-wrapper browse-page">
      {/* Page Header */}
      <div className="browse-hero">
        <div className="container">
          <h1 className="section-title">Browse Books</h1>
          <p className="section-subtitle">Explore our curated collection of {books.length}+ titles</p>
        </div>
      </div>

      <div className="container browse-layout">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="browse-main">
          {/* Toolbar */}
          <div className="browse-toolbar">
            {/* Search */}
            <div className="browse-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search books or authors..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="browse-search-input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="search-clear">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Mobile Filter Btn */}
            <button
              className="mobile-filter-btn"
              onClick={() => setSidebarOpen(true)}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="filter-count-badge">{activeFilterCount}</span>
              )}
            </button>

            {/* Sort */}
            <div className="sort-select-wrap">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="sort-select"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="sort-chevron" />
            </div>

            <span className="results-count">
              {filteredBooks.length} result{filteredBooks.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Active filter pills */}
          {activeFilterCount > 0 && (
            <div className="active-filters">
              {selectedGenre !== 'All' && (
                <span className="active-filter-pill">
                  {selectedGenre}
                  <button onClick={() => setSelectedGenre('All')}><X size={11} /></button>
                </span>
              )}
              {selectedPrice !== 0 && (
                <span className="active-filter-pill">
                  {PRICE_RANGES[selectedPrice].label}
                  <button onClick={() => setSelectedPrice(0)}><X size={11} /></button>
                </span>
              )}
              {selectedFormat !== 'All' && (
                <span className="active-filter-pill">
                  {selectedFormat}
                  <button onClick={() => setSelectedFormat('All')}><X size={11} /></button>
                </span>
              )}
            </div>
          )}

          {/* Books Grid */}
          {loading ? (
            <div className="books-grid">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>No books found</h3>
              <p>Try adjusting your filters or search for something different</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="books-grid">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      {sidebarOpen && (
        <div className="mobile-sidebar-drawer open">
          <div className="mobile-sidebar-header">
            <span>Filters</span>
            <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
          </div>
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default Browse;
