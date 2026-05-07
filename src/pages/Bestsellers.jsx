import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import BookCard from '../components/BookCard';
import { books } from '../data/books';
import './ShelfPage.css';

const Bestsellers = () => {
  const bestsellers = books.filter(b => b.isBestseller);
  const shelfRefs = [useRef(null), useRef(null), useRef(null)];

  const scroll = (ref, dir) => {
    if (ref.current) ref.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  const categories = [
    { title: 'Top Sellers This Week', books: bestsellers.slice(0, 6) },
    { title: 'All-Time Classics', books: bestsellers.slice(2, 8) },
    { title: 'Reader Favourites', books: bestsellers },
  ];

  return (
    <div className="page-wrapper shelf-page">
      <div className="shelf-page-hero">
        <div className="container">
          <div className="shelf-hero-eyebrow"><TrendingUp size={16} /> Bestsellers</div>
          <h1 className="section-title">The Books Everyone's Reading</h1>
          <p className="section-subtitle">Updated weekly based on reader purchases and reviews</p>
        </div>
      </div>

      <div className="container shelf-page-content">
        {categories.map((cat, idx) => (
          <div key={idx} className="shelf-category">
            <div className="shelf-cat-header">
              <h2 className="shelf-cat-title">{cat.title}</h2>
              <div className="shelf-cat-controls">
                <button className="shelf-btn" onClick={() => scroll(shelfRefs[idx], -1)}>
                  <ChevronLeft size={18} />
                </button>
                <button className="shelf-btn" onClick={() => scroll(shelfRefs[idx], 1)}>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div className="shelf-scroll" ref={shelfRefs[idx]}>
              {cat.books.map(book => (
                <BookCard key={book.id} book={book} size="shelf" />
              ))}
            </div>
          </div>
        ))}

        {/* Full grid */}
        <div className="shelf-all-section">
          <h2 className="shelf-cat-title">All Bestsellers</h2>
          <div className="books-grid" style={{ marginTop: 24 }}>
            {bestsellers.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
