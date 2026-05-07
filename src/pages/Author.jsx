import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Users, ArrowLeft } from 'lucide-react';
import { authors, books } from '../data/books';
import BookCard from '../components/BookCard';
import './Author.css';

const Author = () => {
  const { id } = useParams();
  const author = authors.find(a => a.id === Number(id));

  if (!author) {
    return (
      <div className="page-wrapper">
        <div className="container empty-state" style={{ paddingTop: 80 }}>
          <div className="empty-state-icon">👤</div>
          <h3>Author not found</h3>
          <Link to="/browse" className="btn btn-primary">Browse Books</Link>
        </div>
      </div>
    );
  }

  const authorBooks = books.filter(b => b.authorId === author.id);

  return (
    <div className="page-wrapper author-page">
      {/* Hero */}
      <div className="author-hero">
        <div className="author-hero-bg" style={{ backgroundImage: `url(${author.image})` }} />
        <div className="author-hero-overlay" />
        <div className="container author-hero-content">
          <Link to="/browse" className="back-link">
            <ArrowLeft size={16} /> Browse Books
          </Link>
          <div className="author-hero-inner">
            <div className="author-avatar-wrap">
              <img src={author.image} alt={author.name} className="author-avatar" />
            </div>
            <div className="author-hero-text">
              <div className="author-label">Author</div>
              <h1 className="author-name">{author.name}</h1>
              <p className="author-genre">{author.genre}</p>
              <div className="author-stats">
                <div className="author-stat">
                  <BookOpen size={16} />
                  <span><strong>{author.booksCount}</strong> Books</span>
                </div>
                <div className="author-stat">
                  <Users size={16} />
                  <span><strong>{author.followers}</strong> Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="container">
        <div className="author-bio-section">
          <h2 className="author-section-title">About {author.name}</h2>
          <div className="divider" />
          <p className="author-bio">{author.bio}</p>
        </div>

        {/* Books */}
        {authorBooks.length > 0 && (
          <div className="author-books-section">
            <h2 className="author-section-title">Books by {author.name}</h2>
            <div className="divider" />
            <div className="books-grid" style={{ marginTop: 28 }}>
              {authorBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        )}

        {authorBooks.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h3>No books listed yet</h3>
            <p>Check back soon for books by this author.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Author;
