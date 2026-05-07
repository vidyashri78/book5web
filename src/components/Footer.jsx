import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <BookOpen size={26} />
              <span>Folio <em>&</em> Fable</span>
            </div>
            <p className="footer-tagline">
              A curated haven for bibliophiles. Discover stories that transform, inspire, and endure.
            </p>
            <div className="footer-socials">
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Youtube, href: '#', label: 'Youtube' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} className="social-icon" aria-label={label}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              {[
                { to: '/browse', label: 'All Books' },
                { to: '/bestsellers', label: 'Bestsellers' },
                { to: '/new-arrivals', label: 'New Arrivals' },
                { to: '/browse?genre=Fiction', label: 'Fiction' },
                { to: '/browse?genre=Sci-Fi', label: 'Sci-Fi & Fantasy' },
                { to: '/browse?genre=Self-Help', label: 'Self-Help' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="footer-col">
            <h4 className="footer-heading">Account</h4>
            <ul className="footer-links">
              {[
                { to: '/wishlist', label: 'Reading List' },
                { to: '/contact', label: 'Contact Us' },
                { to: '#', label: 'My Orders' },
                { to: '#', label: 'Gift Cards' },
                { to: '#', label: 'Newsletter' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Visit Us</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={15} />
                <span>42 Bibliophile Lane,<br />Inkwell District, NY 10012</span>
              </li>
              <li>
                <Phone size={15} />
                <span>+1 (555) 842-7290</span>
              </li>
              <li>
                <Mail size={15} />
                <span>hello@folioandfable.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="footer-newsletter">
              <p>Get weekly reading recommendations</p>
              <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email..."
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Folio & Fable. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
