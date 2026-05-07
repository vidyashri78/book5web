import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Twitter, Facebook } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="page-wrapper contact-page">
      {/* Hero */}
      <div className="contact-hero">
        <div className="container contact-hero-inner">
          <div className="contact-hero-text">
            <h1 className="section-title contact-title">Get in Touch</h1>
            <p className="section-subtitle">
              We'd love to hear from you — whether it's a book recommendation, a question, or just to say hello.
            </p>
          </div>
        </div>
      </div>

      <div className="container contact-layout">
        {/* Info Column */}
        <div className="contact-info">
          <div className="contact-info-card">
            <h2 className="contact-info-title">Visit Our Store</h2>
            <div className="divider" />

            <ul className="contact-details">
              <li className="contact-detail-item">
                <div className="contact-detail-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="detail-label">Address</span>
                  <span className="detail-value">42 Bibliophile Lane<br />Inkwell District, NY 10012</span>
                </div>
              </li>
              <li className="contact-detail-item">
                <div className="contact-detail-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">+1 (555) 842-7290</span>
                </div>
              </li>
              <li className="contact-detail-item">
                <div className="contact-detail-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="detail-label">Email</span>
                  <span className="detail-value">hello@folioandfable.com</span>
                </div>
              </li>
              <li className="contact-detail-item">
                <div className="contact-detail-icon">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="detail-label">Hours</span>
                  <span className="detail-value">
                    Mon – Fri: 9am – 8pm<br />
                    Sat – Sun: 10am – 6pm
                  </span>
                </div>
              </li>
            </ul>

            {/* Map placeholder */}
            <div className="contact-map">
              <iframe
                title="Store Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0089%2C40.7128%2C-73.9989%2C40.7228&layer=mapnik"
                style={{ width: '100%', height: '200px', border: 'none', borderRadius: 'var(--radius-md)' }}
                loading="lazy"
              />
            </div>

            {/* Socials */}
            <div className="contact-socials">
              <h4>Follow Us</h4>
              <div className="social-links">
                {[
                  { Icon: Instagram, label: 'Instagram', href: '#' },
                  { Icon: Twitter, label: 'Twitter', href: '#' },
                  { Icon: Facebook, label: 'Facebook', href: '#' },
                ].map(({ Icon, label, href }) => (
                  <a key={label} href={href} className="contact-social-link">
                    <Icon size={17} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="contact-form-col">
          {submitted ? (
            <div className="contact-success">
              <div className="success-icon">📬</div>
              <h3>Message Sent!</h3>
              <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
              <button
                className="btn btn-primary"
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 className="contact-form-title">Send a Message</h2>
              <div className="divider" />

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Jane Austen"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  className="form-input"
                  value={form.subject}
                  onChange={handleChange}
                >
                  <option value="">Choose a topic…</option>
                  <option value="order">Order Enquiry</option>
                  <option value="recommendation">Book Recommendation</option>
                  <option value="event">Events & Readings</option>
                  <option value="press">Press & Media</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input form-textarea"
                  placeholder="Tell us what's on your mind…"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className={`btn btn-primary contact-submit ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="submit-spinner" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Strip */}
      <div className="container">
        <div className="faq-section">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            {[
              {
                q: 'Do you offer international shipping?',
                a: 'Yes! We ship to over 50 countries worldwide. Delivery times and rates vary by destination.',
              },
              {
                q: "Can I return a book if I don't like it?",
                a: 'Absolutely. We offer a 30-day return policy for all undamaged books with original receipt.',
              },
              {
                q: 'Do you have a book club or events?',
                a: 'We host monthly book club meetings and author readings. Check our events page for upcoming dates.',
              },
              {
                q: "How can I request a book you don't stock?",
                a: "Use the contact form above with 'Other' as the subject, and we'll do our best to source it.",
              },
            ].map(({ q, a }, i) => (
              <div key={i} className="faq-item">
                <h4>{q}</h4>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
