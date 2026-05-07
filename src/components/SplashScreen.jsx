import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import './SplashScreen.css';

/* ─── Floating book data ─── */
const FLOAT_BOOKS = [
  { cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop', delay: 0,    x: '8%',   rotate: -12, duration: 6 },
  { cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=280&fit=crop', delay: 0.4, x: '80%',  rotate: 10,  duration: 7 },
  { cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=280&fit=crop', delay: 0.8, x: '55%',  rotate: -6,  duration: 5.5 },
  { cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&h=280&fit=crop', delay: 0.2, x: '22%',  rotate: 8,   duration: 6.5 },
  { cover: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=200&h=280&fit=crop', delay: 1.0, x: '68%',  rotate: -15, duration: 7.5 },
  { cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=280&fit=crop', delay: 0.6, x: '38%',  rotate: 5,   duration: 6.2 },
];

/* ─── Animated book pages (SVG-based) ─── */
const BookPages = () => (
  <svg className="splash-book-svg" viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg">
    {/* Spine */}
    <rect x="57" y="10" width="6" height="70" rx="1" fill="#8B5E3C" opacity="0.9"/>
    {/* Left page group */}
    <g className="page-left">
      <path d="M57 12 Q30 20 18 45 Q30 70 57 78 L57 12Z" fill="#F5E9DC" opacity="0.95"/>
      <line x1="35" y1="35" x2="55" y2="35" stroke="#D4A373" strokeWidth="1" opacity="0.5"/>
      <line x1="32" y1="42" x2="55" y2="42" stroke="#D4A373" strokeWidth="1" opacity="0.5"/>
      <line x1="34" y1="49" x2="55" y2="49" stroke="#D4A373" strokeWidth="1" opacity="0.5"/>
      <line x1="36" y1="56" x2="55" y2="56" stroke="#D4A373" strokeWidth="1" opacity="0.5"/>
    </g>
    {/* Right page group */}
    <g className="page-right">
      <path d="M63 12 Q90 20 102 45 Q90 70 63 78 L63 12Z" fill="#FAF6F1" opacity="0.95"/>
      <line x1="65" y1="35" x2="88" y2="35" stroke="#D4A373" strokeWidth="1" opacity="0.5"/>
      <line x1="65" y1="42" x2="86" y2="42" stroke="#D4A373" strokeWidth="1" opacity="0.5"/>
      <line x1="65" y1="49" x2="87" y2="49" stroke="#D4A373" strokeWidth="1" opacity="0.5"/>
      <line x1="65" y1="56" x2="85" y2="56" stroke="#D4A373" strokeWidth="1" opacity="0.5"/>
    </g>
    {/* Flipping page */}
    <g className="page-flip">
      <path d="M60 12 Q80 28 88 45 Q80 62 60 78 L60 12Z" fill="#EDE0CC" opacity="0.85"/>
    </g>
    {/* Shadow under book */}
    <ellipse cx="60" cy="84" rx="30" ry="4" fill="rgba(0,0,0,0.18)" />
  </svg>
);

/* ─── Particle sparkle ─── */
const Particles = () => (
  <div className="splash-particles" aria-hidden>
    {Array.from({ length: 24 }).map((_, i) => (
      <span
        key={i}
        className="particle"
        style={{
          '--px': `${Math.random() * 100}%`,
          '--py': `${Math.random() * 100}%`,
          '--ps': `${0.4 + Math.random() * 1}px`,
          '--pd': `${Math.random() * 5}s`,
          '--pdu': `${2 + Math.random() * 3}s`,
        }}
      />
    ))}
  </div>
);

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
const SplashScreen = ({ onDone }) => {
  const [phase, setPhase] = useState('enter');   // enter → hold → exit
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const TOTAL_MS = 4200;

  useEffect(() => {
    /* Progress bar */
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / TOTAL_MS) * 100, 100));
      if (elapsed < TOTAL_MS) {
        timerRef.current = requestAnimationFrame(tick);
      }
    };
    timerRef.current = requestAnimationFrame(tick);

    /* Auto-exit */
    const exitTimer = setTimeout(() => {
      setPhase('exit');
      setTimeout(onDone, 700);
    }, TOTAL_MS);

    return () => {
      cancelAnimationFrame(timerRef.current);
      clearTimeout(exitTimer);
    };
  }, [onDone]);

  const handleSkip = () => {
    cancelAnimationFrame(timerRef.current);
    setPhase('exit');
    setTimeout(onDone, 600);
  };

  return (
    <div className={`splash-root ${phase}`} aria-label="Welcome splash screen">

      {/* ── Gradient background ── */}
      <div className="splash-bg" />
      <div className="splash-bg-radial" />

      {/* ── Floating background book covers ── */}
      <div className="splash-float-books" aria-hidden>
        {FLOAT_BOOKS.map((b, i) => (
          <div
            key={i}
            className="splash-float-book"
            style={{
              left: b.x,
              '--fd': `${b.delay}s`,
              '--fr': `${b.rotate}deg`,
              '--fdu': `${b.duration}s`,
            }}
          >
            <img src={b.cover} alt="" loading="lazy" />
          </div>
        ))}
      </div>

      {/* ── Particles ── */}
      <Particles />

      {/* ── Horizontal rule lines (library aesthetic) ── */}
      <div className="splash-lines" aria-hidden>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="splash-line" style={{ '--li': i }} />
        ))}
      </div>

      {/* ── Center content ── */}
      <div className="splash-center">

        {/* Animated book SVG */}
        <div className="splash-book-wrap">
          <BookPages />
          <div className="splash-book-glow" />
        </div>

        {/* Logo + brand */}
        <div className="splash-logo">
          <div className="splash-logo-icon">
            <BookOpen size={28} strokeWidth={1.8} />
          </div>
          <span className="splash-brand-name">
            <span>Folio</span>
            <em> &amp; </em>
            <span>Fable</span>
          </span>
        </div>

        {/* Welcome heading */}
        <h1 className="splash-heading">
          Welcome to Our
          <br />
          <span className="splash-heading-accent">Book World</span>
          <span className="splash-book-emoji"> 📚</span>
        </h1>

        {/* Tagline */}
        <p className="splash-tagline">
          Fifty thousand stories. One perfect read waiting for you.
        </p>

        {/* Animated dots */}
        <div className="splash-dots">
          <span className="splash-dot" style={{ '--di': 0 }} />
          <span className="splash-dot" style={{ '--di': 1 }} />
          <span className="splash-dot" style={{ '--di': 2 }} />
        </div>

        {/* Progress bar */}
        <div className="splash-progress-wrap">
          <div className="splash-progress-bar" style={{ width: `${progress}%` }} />
        </div>

        {/* Skip button */}
        <button className="splash-skip" onClick={handleSkip}>
          Skip intro
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
