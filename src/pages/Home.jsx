import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronLeft, ChevronRight, Sparkles, TrendingUp, Star,
  BookOpen, Lightbulb, Rocket, Wand2, Heart, Search, User, Landmark, Swords,
} from 'lucide-react';
import BookCard from '../components/BookCard';
import { books, genres } from '../data/books';
import './Home.css';

/* Map genre lucideIcon strings → actual components */
const GENRE_ICON_MAP = {
  BookOpen, Lightbulb, Rocket, Wand2, Heart, Search, User, Landmark, Swords,
};

/* ── Intersection-observer hook for scroll reveals ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Skeleton card ── */
const SkeletonCard = () => (
  <div className="skeleton-book">
    <div className="skeleton" style={{ aspectRatio: '2/3', borderRadius: 'var(--radius-md)' }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '8px 0' }}>
      <div className="skeleton" style={{ height: 14, width: '75%', borderRadius: 4 }} />
      <div className="skeleton" style={{ height: 12, width: '50%', borderRadius: 4 }} />
      <div className="skeleton" style={{ height: 14, width: '35%', borderRadius: 4 }} />
    </div>
  </div>
);

/* ── Main Component ── */
const Home = () => {
  const bestsellers = books.filter(b => b.isBestseller);
  const newArrivals = books.filter(b => b.isNewArrival);

  const [loading, setLoading] = useState(true);
  const [heroRef, heroVisible] = useReveal();
  const [bestsellerRef, bestsellerVisible] = useReveal();
  const [newArrRef, newArrVisible] = useReveal();
  const [genreRef, genreVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  const shelfRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const scrollShelf = (dir) => {
    if (shelfRef.current) {
      shelfRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="home">

      {/* ════════════════════════════════
          HERO SECTION
      ════════════════════════════════ */}
      <section className="hero">
        {/* Background video */}
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&h=1080&fit=crop"
        >
          {/* Fallback: Unsplash video would go here; using poster image as bg */}
        </video>
        <div
          className="hero-bg-image"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&h=1080&fit=crop')`
          }}
        />
        <div className="hero-overlay" />

        <div className="hero-content container" ref={heroRef}>
          <div className={`hero-text ${heroVisible ? 'visible' : ''}`}>
            
            <h1 className="hero-heading">
              Discover Your<br />
              <em>Next Favorite</em><br />
              Book
            </h1>
            <p className="hero-subtext">
              Step into a world where every page is a new adventure. From timeless classics
              to tomorrow's bestsellers — your story starts here.
            </p>
            <div className="hero-cta">
              <Link to="/browse" className="btn btn-accent hero-btn-primary">
                Browse Books
                <ArrowRight size={18} />
              </Link>
              <Link to="/bestsellers" className="btn hero-btn-ghost">
                View Bestsellers
              </Link>
            </div>

            {/* Hero stats */}
            <div className="hero-stats">
              {[
                { value: '50K+', label: 'Books Available' },
                { value: '4.8★', label: 'Average Rating' },
                { value: '2M+', label: 'Happy Readers' },
              ].map(({ value, label }) => (
                <div key={label} className="hero-stat">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating book cards */}
          <div className="hero-books-preview">
            {bestsellers.slice(0, 3).map((book, i) => (
              <div
                key={book.id}
                className="hero-float-card"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <img src={book.cover} alt={book.title} />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-dot" />
        </div>
      </section>

      {/* ════════════════════════════════
          GENRE STRIP
      ════════════════════════════════ */}
      <section className="genre-strip" ref={genreRef}>
        <div className="container">
          <div className={`genre-list ${genreVisible ? 'visible' : ''}`}>
            {genres.map((g, i) => {
              const IconComp = GENRE_ICON_MAP[g.lucideIcon] || BookOpen;
              return (
                <Link
                  to={`/browse?genre=${g.name}`}
                  key={g.id}
                  className="genre-chip"
                  style={{ '--genre-color': g.color, '--genre-bg': g.bg, animationDelay: `${i * 0.06}s` }}
                >
                  <span className="genre-icon-wrap" style={{ background: g.bg, color: g.color }}>
                    <IconComp size={16} strokeWidth={2} />
                  </span>
                  <span className="genre-name">{g.name}</span>
                  <span className="genre-count">{g.count.toLocaleString()}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          BESTSELLERS SHELF
      ════════════════════════════════ */}
      <section className="section bestsellers-section" ref={bestsellerRef}>
        <div className="container">
          <div className={`section-header ${bestsellerVisible ? 'visible' : ''}`}>
            <div>
              <div className="section-eyebrow">
                <TrendingUp size={16} />
                <span>What everyone's reading</span>
              </div>
              <h2 className="section-title">Bestsellers</h2>
              <div className="divider" />
              <p className="section-subtitle">The books readers can't put down right now</p>
            </div>
            <div className="shelf-controls">
              <button className="shelf-btn" onClick={() => scrollShelf(-1)} aria-label="Scroll left">
                <ChevronLeft size={20} />
              </button>
              <button className="shelf-btn" onClick={() => scrollShelf(1)} aria-label="Scroll right">
                <ChevronRight size={20} />
              </button>
              <Link to="/bestsellers" className="btn btn-outline">
                See All <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Shelf */}
          <div className="shelf-container">
            <div className="shelf-scroll" ref={shelfRef}>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="shelf-skeleton-wrap">
                      <SkeletonCard />
                    </div>
                  ))
                : bestsellers.map(book => (
                    <BookCard key={book.id} book={book} size="shelf" />
                  ))
              }
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          FEATURE BANNER
      ════════════════════════════════ */}
      <section className="feature-banner">
        <div className="container feature-banner-inner">
          <div className="feature-banner-text">
            <h2>Free shipping on orders over $35</h2>
            <p>Plus exclusive member discounts on all new arrivals</p>
          </div>
          <Link to="/browse" className="btn btn-accent">
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════
          NEW ARRIVALS GRID
      ════════════════════════════════ */}
      <section className="section new-arrivals-section" ref={newArrRef}>
        <div className="container">
          <div className={`section-header ${newArrVisible ? 'visible' : ''}`}>
            <div>
              <div className="section-eyebrow">
                <Sparkles size={16} />
                <span>Fresh off the press</span>
              </div>
              <h2 className="section-title">New Arrivals</h2>
              <div className="divider" />
              <p className="section-subtitle">The latest titles to grace our shelves</p>
            </div>
            <Link to="/new-arrivals" className="btn btn-outline">
              See All <ArrowRight size={16} />
            </Link>
          </div>

          <div className={`books-grid new-arrivals-grid ${newArrVisible ? 'visible' : ''}`}>
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : newArrivals.map((book, i) => (
                  <div
                    key={book.id}
                    className="grid-item"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <BookCard book={book} />
                  </div>
                ))
            }
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          TESTIMONIAL / QUOTE STRIP
      ════════════════════════════════ */}
      <section className="quote-section">
        <div className="container">
          <blockquote className="featured-quote">
            <span className="quote-mark">"</span>
            A reader lives a thousand lives before he dies. The man who never reads lives only one.
            <footer>— George R.R. Martin</footer>
          </blockquote>
        </div>
      </section>

      {/* ════════════════════════════════
          CTA SECTION
      ════════════════════════════════ */}
      <section className="cta-section" ref={ctaRef}>
        <div className={`container cta-inner ${ctaVisible ? 'visible' : ''}`}>
          <div className="cta-bg-books">
            {bestsellers.slice(0, 5).map((book, i) => (
              <img
                key={book.id}
                src={book.cover}
                alt=""
                className="cta-bg-book"
                style={{ '--i': i }}
              />
            ))}
          </div>
          <div className="cta-content">
            <Star size={32} className="cta-star" />
            <h2>Start Your Reading Journey</h2>
            <p>Join over 2 million readers who've found their next great story with us.</p>
            <div className="cta-buttons">
              <Link to="/browse" className="btn btn-primary">
                Browse All Books <ArrowRight size={16} />
              </Link>
              <Link to="/wishlist" className="btn btn-outline cta-outline">
                My Reading List
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
