import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import './BookCard.css';

const getBadgeClass = (badge) => {
  const map = {
    'Bestseller': 'badge-bestseller',
    'New Arrival': 'badge-new',
    'Award Winner': 'badge-award',
    'Top Rated': 'badge-top',
    'Classic': 'badge-classic',
  };
  return map[badge] || 'badge-bestseller';
};

const BookCard = ({ book, size = 'normal' }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [imgError, setImgError] = useState(false);
  const inWishlist = isInWishlist(book.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
        strokeWidth={i < Math.floor(rating) ? 0 : 1.5}
      />
    ));
  };

  return (
    <Link to={`/book/${book.id}`} className={`book-card ${size}`}>
      <div className="book-cover-wrap">
        {imgError ? (
          <div className="book-cover-placeholder">
            <span>📖</span>
            <span>{book.title}</span>
          </div>
        ) : (
          <img
            src={book.cover}
            alt={book.title}
            className="book-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}

        {/* Overlay */}
        <div className="book-overlay">
          <button className="overlay-btn">
            <ShoppingBag size={16} />
            <span>View Book</span>
          </button>
        </div>

        {/* Badge */}
        {book.badge && (
          <span className={`book-badge badge ${getBadgeClass(book.badge)}`}>
            {book.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          className={`wishlist-toggle ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlist}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>

        <div className="book-meta">
          <div className="book-stars">
            <span className="stars">{renderStars(book.rating)}</span>
            <span className="book-rating-num">{book.rating}</span>
          </div>
          <span className="book-genre">{book.genre}</span>
        </div>

        <div className="book-price">
          <span className="price-current">${book.price}</span>
          {book.originalPrice && (
            <span className="price-original">${book.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
