import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Star, ArrowLeft, BookOpen, Globe, Hash, Calendar, ChevronDown, ChevronUp, Share2, ShoppingCart, Zap } from 'lucide-react';
import { books, reviews } from '../data/books';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find(b => b.id === Number(id));
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart, placeOrder, orderPlaced } = useCart();
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);
  const [addedToList, setAddedToList] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  if (!book) {
    return (
      <div className="page-wrapper">
        <div className="container empty-state">
          <div className="empty-state-icon">📭</div>
          <h3>Book not found</h3>
          <p>This book may have left our shelves.</p>
          <Link to="/browse" className="btn btn-primary">Browse All Books</Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(book.id);
  const bookReviews = reviews.filter(r => r.bookId === book.id);
  const relatedBooks = books.filter(b => b.genre === book.genre && b.id !== book.id).slice(0, 4);

  const handleWishlist = () => {
    if (inWishlist) removeFromWishlist(book.id);
    else addToWishlist(book);
  };

  const handleAddToCart = () => {
    addToCart(book);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  const handleOrderNow = () => {
    addToCart(book);
    placeOrder();
  };

  const handleAddToReadingList = () => {
    addToWishlist(book);
    setAddedToList(true);
    setTimeout(() => setAddedToList(false), 2000);
  };

  const renderStars = (rating, size = 16) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={size}
        fill={i < Math.floor(rating) ? '#F0A500' : 'none'}
        color={i < Math.floor(rating) ? '#F0A500' : '#CCC'}
        strokeWidth={1.5}
      />
    ));

  return (
    <div className="page-wrapper book-detail-page">
      {/* Breadcrumb */}
      <div className="detail-breadcrumb">
        <div className="container breadcrumb-inner">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <span className="breadcrumb-sep">/</span>
          <Link to="/browse">Browse</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to={`/browse?genre=${book.genre}`}>{book.genre}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{book.title}</span>
        </div>
      </div>

      {/* Main Detail */}
      <div className="container detail-main">
        {/* Book Cover */}
        <div className="detail-cover-col">
          <div className="detail-cover-wrap">
            <img src={book.cover} alt={book.title} className="detail-cover" />
            <div className="detail-cover-shadow" />
          </div>
          {book.badge && (
            <span className={`badge badge-${book.badge === 'Bestseller' ? 'bestseller' : book.badge === 'New Arrival' ? 'new' : 'award'} detail-badge`}>
              {book.badge}
            </span>
          )}
          {/* Format pills */}
          <div className="detail-formats">
            {book.format.map(f => (
              <span key={f} className="format-pill">{f}</span>
            ))}
          </div>
        </div>

        {/* Book Info */}
        <div className="detail-info-col">
          <div className="detail-genre-tag">{book.genre}</div>

          <h1 className="detail-title">{book.title}</h1>

          <Link to={`/author/${book.authorId}`} className="detail-author">
            by <span>{book.author}</span>
          </Link>

          {/* Rating Row */}
          <div className="detail-rating-row">
            <div className="detail-stars">{renderStars(book.rating)}</div>
            <span className="detail-rating-num">{book.rating}</span>
            <span className="detail-reviews-count">({book.reviews.toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div className="detail-price-row">
            <span className="detail-price">${book.price}</span>
            {book.originalPrice && (
              <>
                <span className="detail-price-original">${book.originalPrice}</span>
                <span className="detail-discount">
                  {Math.round((1 - book.price / book.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="detail-description">
            <p className="detail-desc-short">{book.description}</p>
          </div>

          {/* CTA Buttons */}
          <div className="detail-actions">
            <button
              className={`btn btn-primary detail-cta order-now-btn ${orderPlaced ? 'order-success' : ''}`}
              onClick={handleOrderNow}
            >
              <Zap size={17} />
              {orderPlaced ? '✓ Order Placed!' : 'Order Now'}
            </button>
            <button
              className={`btn btn-outline detail-cta-secondary ${cartAdded ? 'cart-added' : ''}`}
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
              {cartAdded ? 'Added!' : 'Add to Cart'}
            </button>
            <button
              className={`btn btn-ghost detail-cta-reading ${addedToList ? 'added' : ''}`}
              onClick={handleAddToReadingList}
            >
              <BookOpen size={16} />
              {addedToList ? '✓ Saved' : 'Reading List'}
            </button>
            <button
              className={`wishlist-heart-btn ${inWishlist ? 'active' : ''}`}
              onClick={handleWishlist}
              aria-label="Toggle wishlist"
            >
              <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
            </button>
            <button className="wishlist-heart-btn share-btn" aria-label="Share">
              <Share2 size={18} />
            </button>
          </div>

          {/* Meta Info */}
          <div className="detail-meta-grid">
            {[
              { icon: <Hash size={15} />, label: 'Pages', value: book.pages },
              { icon: <Calendar size={15} />, label: 'Published', value: book.published },
              { icon: <Globe size={15} />, label: 'Language', value: book.language },
              { icon: <BookOpen size={15} />, label: 'Genre', value: book.genre },
            ].map(({ icon, label, value }) => (
              <div key={label} className="detail-meta-item">
                <span className="meta-icon">{icon}</span>
                <div>
                  <span className="meta-label">{label}</span>
                  <span className="meta-value">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Synopsis */}
      <div className="container">
        <div className="detail-synopsis-section">
          <h2 className="detail-section-heading">Synopsis</h2>
          <div className={`synopsis-text ${synopsisExpanded ? 'expanded' : ''}`}>
            <p>{book.synopsis}</p>
            <p style={{ marginTop: 16 }}>
              {book.description} This is one of those rare books that manages to be both entertaining and deeply moving, leaving readers with a renewed appreciation for the choices they make and the paths not taken.
            </p>
          </div>
          <button
            className="synopsis-toggle"
            onClick={() => setSynopsisExpanded(!synopsisExpanded)}
          >
            {synopsisExpanded ? (
              <><ChevronUp size={16} /> Show Less</>
            ) : (
              <><ChevronDown size={16} /> Read More</>
            )}
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="container">
        <div className="detail-reviews-section">
          <div className="reviews-header">
            <h2 className="detail-section-heading">Reader Reviews</h2>
            <div className="reviews-summary">
              <div className="reviews-avg">
                <span className="avg-number">{book.rating}</span>
                <div>
                  <div className="avg-stars">{renderStars(book.rating, 18)}</div>
                  <span className="avg-count">{book.reviews.toLocaleString()} reviews</span>
                </div>
              </div>
            </div>
          </div>

          {bookReviews.length > 0 ? (
            <div className="reviews-list">
              {bookReviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <img src={review.avatar} alt={review.user} className="review-avatar" />
                    <div className="review-user-info">
                      <span className="review-user">{review.user}</span>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <div className="review-stars">{renderStars(review.rating, 14)}</div>
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-reviews">No reviews yet. Be the first to review this book!</p>
          )}
        </div>
      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <div className="container detail-related">
          <h2 className="detail-section-heading">You Might Also Like</h2>
          <div className="related-books-grid">
            {relatedBooks.map(b => (
              <Link to={`/book/${b.id}`} key={b.id} className="related-book-card">
                <img src={b.cover} alt={b.title} />
                <div className="related-book-info">
                  <span className="related-book-title">{b.title}</span>
                  <span className="related-book-author">{b.author}</span>
                  <span className="related-book-price">${b.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
