import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';
import { authors, books } from '../data/books';
import './AuthorsList.css';

const AuthorsList = () => {
  return (
    <div className="page-wrapper authors-list-page">
      {/* Hero */}
      <div className="authors-list-hero">
        <div className="container">
          <div className="authors-hero-eyebrow">
            <Users size={15} />
            <span>Meet the Minds</span>
          </div>
          <h1 className="section-title" style={{ color: 'white' }}>Featured Authors</h1>
          <p className="section-subtitle" style={{ color: 'rgba(245,233,220,0.72)' }}>
            Discover the storytellers behind your favourite books
          </p>
        </div>
      </div>

      <div className="container authors-list-content">
        <div className="authors-big-grid">
          {authors.map((author, i) => {
            const authorBooks = books.filter(b => b.authorId === author.id);
            return (
              <Link
                key={author.id}
                to={`/author/${author.id}`}
                className="author-big-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Cover strip */}
                <div className="author-card-covers">
                  {authorBooks.slice(0, 3).map(b => (
                    <img key={b.id} src={b.cover} alt="" className="author-cover-strip" />
                  ))}
                  <div className="author-card-cover-overlay" />
                </div>

                {/* Profile */}
                <div className="author-card-body">
                  <div className="author-card-avatar-wrap">
                    <img src={author.image} alt={author.name} className="author-card-avatar" />
                  </div>
                  <h3 className="author-card-name">{author.name}</h3>
                  <p className="author-card-genre">{author.genre}</p>
                  <p className="author-card-bio">{author.bio.slice(0, 100)}…</p>

                  <div className="author-card-stats">
                    <span className="author-stat-pill">
                      <BookOpen size={12} /> {author.booksCount} Books
                    </span>
                    <span className="author-stat-pill followers">
                      {author.followers} Followers
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthorsList;
