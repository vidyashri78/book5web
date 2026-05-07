import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Heart, Moon, Sun, Menu, X, BookOpen,
  ShoppingCart, ChevronDown, Users, ArrowRight,
  BookMarked, TrendingUp, Sparkles, Phone,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { authors } from '../data/books';
import './Navbar.css';

/* ── ripple helper ── */
const ripple = (e) => {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const rect = btn.getBoundingClientRect();
  circle.style.cssText = `
    width:${diameter}px;height:${diameter}px;
    left:${e.clientX - rect.left - diameter / 2}px;
    top:${e.clientY - rect.top - diameter / 2}px;
  `;
  circle.classList.add('ripple-dot');
  btn.querySelector('.ripple-dot')?.remove();
  btn.appendChild(circle);
};

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authorsOpen, setAuthorsOpen] = useState(false);
  const [cartOpen, setCartOpen]     = useState(false);
  const [mobileAuthorsOpen, setMobileAuthorsOpen] = useState(false);

  const { isDark, toggleTheme }   = useTheme();
  const { wishlist }               = useWishlist();
  const { cart, totalItems, totalPrice, removeFromCart, placeOrder, orderPlaced } = useCart();
  const navigate  = useNavigate();
  const location  = useLocation();
  const authorsRef = useRef(null);
  const cartRef    = useRef(null);

  /* scroll detection — also force solid on non-home pages */
  useEffect(() => {
    const isHome = location.pathname === '/';
    const onScroll = () => {
      setScrolled(!isHome || window.scrollY > 40);
    };
    // Set immediately on mount / route change
    setScrolled(!isHome || window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  /* close panels on route change */
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setAuthorsOpen(false);
    setCartOpen(false);
  }, [location.pathname]);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (authorsRef.current && !authorsRef.current.contains(e.target)) setAuthorsOpen(false);
      if (cartRef.current && !cartRef.current.contains(e.target)) setCartOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const featuredAuthors = authors.filter(a => a.featured !== false);

  const navLinks = [
    { to: '/', label: 'Home', icon: <BookOpen size={15} /> },
    { to: '/browse', label: 'Browse', icon: <Search size={15} /> },
    { to: '/bestsellers', label: 'Bestsellers', icon: <TrendingUp size={15} /> },
    { to: '/new-arrivals', label: 'New Arrivals', icon: <Sparkles size={15} /> },
    { to: '/contact', label: 'Contact', icon: <Phone size={15} /> },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="nav-container">

          {/* ── Logo ── */}
          <Link to="/" className="nav-logo">
            <BookOpen size={24} className="logo-icon" />
            <span className="logo-text">
              <span className="logo-primary">Folio</span>
              <span className="logo-amp"> &amp; </span>
              <span className="logo-secondary">Fable</span>
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <ul className="nav-links">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end={to === '/'}
                >
                  {label}
                </NavLink>
              </li>
            ))}

            {/* Authors dropdown */}
            <li ref={authorsRef} className="nav-item-dropdown">
              <button
                className={`nav-link nav-link-btn ${authorsOpen ? 'active' : ''}`}
                onClick={() => setAuthorsOpen(p => !p)}
                aria-expanded={authorsOpen}
              >
                <Users size={14} style={{ marginRight: 5 }} />
                Authors
                <ChevronDown size={13} className={`dropdown-chevron ${authorsOpen ? 'rotated' : ''}`} />
              </button>

              {/* Mega menu */}
              <div className={`authors-mega-menu ${authorsOpen ? 'open' : ''}`}>
                <div className="mega-menu-inner">
                  <div className="mega-menu-header">
                    <h3>Featured Authors</h3>
                    <Link to="/authors" className="mega-view-all" onClick={() => setAuthorsOpen(false)}>
                      View all <ArrowRight size={13} />
                    </Link>
                  </div>
                  <div className="mega-authors-grid">
                    {featuredAuthors.map((author) => (
                      <Link
                        key={author.id}
                        to={`/author/${author.id}`}
                        className="mega-author-card"
                        onClick={() => setAuthorsOpen(false)}
                      >
                        <div className="mega-avatar-wrap">
                          <img src={author.image} alt={author.name} className="mega-avatar" />
                          <div className="mega-avatar-ring" />
                        </div>
                        <div className="mega-author-info">
                          <span className="mega-author-name">{author.name}</span>
                          <span className="mega-author-genre">{author.genre}</span>
                          <span className="mega-author-books">{author.booksCount} books</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mega-menu-footer">
                    <BookMarked size={13} />
                    <span>Discover books from {authors.length}+ featured authors</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          {/* ── Actions ── */}
          <div className="nav-actions">
            {/* Search */}
            <button className="nav-action-btn" onClick={() => setSearchOpen(p => !p)} aria-label="Search">
              <Search size={19} />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="nav-action-btn" aria-label="Wishlist">
              <Heart size={19} />
              {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
            </Link>

            {/* Cart */}
            <div ref={cartRef} className="cart-wrapper">
              <button
                className="nav-action-btn cart-btn"
                onClick={() => setCartOpen(p => !p)}
                aria-label="Cart"
              >
                <ShoppingCart size={19} />
                {totalItems > 0 && <span className="badge-count cart-badge">{totalItems}</span>}
              </button>

              {/* Cart dropdown */}
              <div className={`cart-dropdown ${cartOpen ? 'open' : ''}`}>
                <div className="cart-dropdown-header">
                  <h4>Your Cart</h4>
                  <span className="cart-item-count">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
                </div>

                {cart.length === 0 ? (
                  <div className="cart-empty">
                    <ShoppingCart size={32} />
                    <p>Your cart is empty</p>
                    <Link to="/browse" className="btn btn-primary cart-browse-btn" onClick={() => setCartOpen(false)}>
                      Browse Books
                    </Link>
                  </div>
                ) : (
                  <>
                    <ul className="cart-items">
                      {cart.map(item => (
                        <li key={item.id} className="cart-item">
                          <img src={item.cover} alt={item.title} className="cart-item-img" />
                          <div className="cart-item-info">
                            <span className="cart-item-title">{item.title}</span>
                            <span className="cart-item-price">${(item.price * item.qty).toFixed(2)}</span>
                            <span className="cart-item-qty">Qty: {item.qty}</span>
                          </div>
                          <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                            <X size={13} />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="cart-total-row">
                      <span>Total</span>
                      <span className="cart-total-price">${totalPrice.toFixed(2)}</span>
                    </div>
                    <button
                      className={`btn btn-primary cart-order-btn ${orderPlaced ? 'order-success' : ''}`}
                      onClick={(e) => { ripple(e); placeOrder(); }}
                    >
                      {orderPlaced ? '✓ Order Placed!' : 'Place Order'}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Theme */}
            <button className="nav-action-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {/* CTA Order Now */}
            <Link
              to="/browse"
              className="nav-order-btn"
              onClick={ripple}
            >
              Order Now
            </Link>

            {/* Mobile hamburger */}
            <button className="nav-action-btn menu-btn" onClick={() => setMenuOpen(p => !p)} aria-label="Menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className={`search-bar ${searchOpen ? 'open' : ''}`}>
          <form onSubmit={handleSearch} className="search-form">
            <Search size={17} className="search-icon" />
            <input
              type="text"
              placeholder="Search books, authors, genres..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus={searchOpen}
              className="search-input"
            />
            <button type="submit" className="search-submit">Search</button>
          </form>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />

      {/* ── Mobile drawer ── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-top">
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <BookOpen size={20} className="logo-icon" />
            <span className="logo-text" style={{ color: 'var(--text)' }}>
              <span className="logo-primary">Folio</span>
              <span className="logo-amp"> &amp; </span>
              <span className="logo-secondary">Fable</span>
            </span>
          </Link>
          <button className="mobile-close-btn" onClick={() => setMenuOpen(false)}><X size={20} /></button>
        </div>

        <ul className="mobile-nav-links">
          {navLinks.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
              >
                <span className="mobile-link-icon">{icon}</span>
                {label}
              </NavLink>
            </li>
          ))}

          {/* Mobile authors accordion */}
          <li>
            <button
              className={`mobile-nav-link mobile-nav-btn ${mobileAuthorsOpen ? 'active' : ''}`}
              onClick={() => setMobileAuthorsOpen(p => !p)}
            >
              <span className="mobile-link-icon"><Users size={15} /></span>
              Authors
              <ChevronDown size={14} className={`mobile-chevron ${mobileAuthorsOpen ? 'rotated' : ''}`} style={{ marginLeft: 'auto' }} />
            </button>
            <div className={`mobile-authors-list ${mobileAuthorsOpen ? 'open' : ''}`}>
              {featuredAuthors.map(a => (
                <Link
                  key={a.id}
                  to={`/author/${a.id}`}
                  className="mobile-author-item"
                  onClick={() => setMenuOpen(false)}
                >
                  <img src={a.image} alt={a.name} className="mobile-author-avatar" />
                  <div>
                    <span className="mobile-author-name">{a.name}</span>
                    <span className="mobile-author-genre">{a.genre}</span>
                  </div>
                </Link>
              ))}
            </div>
          </li>

          <li>
            <Link to="/wishlist" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              <span className="mobile-link-icon"><Heart size={15} /></span>
              Reading List {wishlist.length > 0 && <span className="mobile-badge">{wishlist.length}</span>}
            </Link>
          </li>
        </ul>

        <div className="mobile-menu-footer">
          <Link to="/browse" className="btn btn-primary mobile-order-btn" onClick={() => setMenuOpen(false)}>
            <ShoppingCart size={16} /> Order Now
          </Link>
          <button className="mobile-theme-toggle" onClick={toggleTheme}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
