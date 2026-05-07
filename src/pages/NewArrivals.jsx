import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import BookCard from '../components/BookCard';
import { books } from '../data/books';
import './ShelfPage.css';

const NewArrivals = () => {
  const newArrivals = books.filter(b => b.isNewArrival);
  const shelfRef = useRef(null);

  const scroll = (dir) => {
    if (shelfRef.current) shelfRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <div className="page-wrapper shelf-page">
      <div className="shelf-page-hero new-arrivals-hero">
        <div className="container">
          <div className="shelf-hero-eyebrow"><Sparkles size={16} /> New Arrivals</div>
          <h1 className="section-title">Fresh Off the Press</h1>
          <p className="section-subtitle">The latest titles to join our curated collection</p>
        </div>
      </div>

      <div className="container shelf-page-content">
        {/* Shelf view */}
        <div className="shelf-category">
          <div className="shelf-cat-header">
            <h2 className="shelf-cat-title">Recently Added</h2>
            <div className="shelf-cat-controls">
              <button className="shelf-btn" onClick={() => scroll(-1)}><ChevronLeft size={18} /></button>
              <button className="shelf-btn" onClick={() => scroll(1)}><ChevronRight size={18} /></button>
            </div>
          </div>
          <div className="shelf-scroll" ref={shelfRef}>
            {newArrivals.map(book => (
              <BookCard key={book.id} book={book} size="shelf" />
            ))}
          </div>
        </div>

        {/* Grid view */}
        <div className="shelf-all-section">
          <h2 className="shelf-cat-title">All New Arrivals</h2>
          <div className="books-grid" style={{ marginTop: 24 }}>
            {newArrivals.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
