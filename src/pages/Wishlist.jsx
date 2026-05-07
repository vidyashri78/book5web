import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, BookOpen, ArrowRight, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import BookCard from '../components/BookCard';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="page-wrapper wishlist-page">
      {/* Header */}
      <div className="wishlist-hero">
        <div className="container">
          <div className="wishlist-hero-inner">
            <div>
              <div className="wishlist-eyebrow">
                <Heart size={15} fill="currentColor" />
                <span>Your Collection</span>
              </div>
              <h1 className="section-title wishlist-title">Reading List</h1>
              <p className="section-subtitle">
                {wishlist.length > 0
                  ? `${wishlist.length} book${wishlist.length > 1 ? 's' : ''} saved`
                  : 'Start saving books you love'}
              </p>
            </div>
            {wishlist.length > 0 && (
              <Link to="/browse" className="btn btn-outline">
                Add More Books <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container wishlist-content">
        {wishlist.length === 0 ? (
          /* Empty State */
          <div className="empty-state wishlist-empty">
            <div className="empty-state-icon">💔</div>
            <h3>Your reading list is empty</h3>
            <p>Save books you want to read by clicking the heart icon on any book card.</p>
            <Link to="/browse" className="btn btn-primary">
              <BookOpen size={18} />
              Discover Books
            </Link>
          </div>
        ) : (
          /* Books Grid */
          <div className="wishlist-grid-wrap">
            {/* List view */}
            <div className="wishlist-list">
              {wishlist.map((book, i) => (
                <div
                  key={book.id}
                  className="wishlist-item"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <Link to={`/book/${book.id}`} className="wishlist-item-cover">
                    <img src={book.cover} alt={book.title} />
                  </Link>
                  <div className="wishlist-item-info">
                    <Link to={`/book/${book.id}`} className="wishlist-item-title">
                      {book.title}
                    </Link>
                    <span className="wishlist-item-author">{book.author}</span>
                    <div className="wishlist-item-meta">
                      <span className="wishlist-item-genre">{book.genre}</span>
                      <span className="wishlist-item-rating">★ {book.rating}</span>
                    </div>
                    <div className="wishlist-item-price">
                      <span className="wi-price">${book.price}</span>
                      {book.originalPrice && (
                        <span className="wi-price-orig">${book.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <div className="wishlist-item-actions">
                    <Link to={`/book/${book.id}`} className="btn btn-primary wi-cta">
                      View Book
                    </Link>
                    <button
                      className="wi-remove-btn"
                      onClick={() => removeFromWishlist(book.id)}
                      aria-label="Remove"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Card grid (secondary) */}
            <div className="wishlist-grid-section">
              <h2 className="wishlist-section-title">All Saved Books</h2>
              <div className="books-grid">
                {wishlist.map(book => <BookCard key={book.id} book={book} />)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
