import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Browse from './pages/Browse';
import BookDetail from './pages/BookDetail';
import Author from './pages/Author';
import AuthorsList from './pages/AuthorsList';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import Bestsellers from './pages/Bestsellers';
import NewArrivals from './pages/NewArrivals';

/* Scroll to top on route change */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

/* Page transition wrapper */
const PageTransition = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.style.opacity = '0';
    const t = setTimeout(() => {
      document.documentElement.style.transition = 'opacity 0.25s ease';
      document.documentElement.style.opacity = '1';
    }, 20);
    return () => {
      clearTimeout(t);
      document.documentElement.style.transition = '';
      document.documentElement.style.opacity = '';
    };
  }, [pathname]);
  return children;
};

const AppLayout = ({ splashActive }) => {
  return (
    <div className={`app ${splashActive ? 'splash-active' : 'splash-done'}`}>
      <ScrollToTop />
      <PageTransition>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/author/:id" element={<Author />} />
            <Route path="/authors" element={<AuthorsList />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bestsellers" element={<Bestsellers />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

const NotFound = () => (
  <div className="page-wrapper">
    <div className="container empty-state" style={{ paddingTop: 80 }}>
      <div className="empty-state-icon">📚</div>
      <h3>Page Not Found</h3>
      <p>The page you're looking for seems to have wandered off the shelf.</p>
      <a href="/" className="btn btn-primary">Go Home</a>
    </div>
  </div>
);

const App = () => {
  // Show splash only once per browser session
  const [showSplash, setShowSplash] = useState(
    () => !sessionStorage.getItem('splashSeen')
  );

  const handleSplashDone = () => {
    sessionStorage.setItem('splashSeen', '1');
    setShowSplash(false);
  };

  return (
    <ThemeProvider>
      <WishlistProvider>
        <CartProvider>
          {showSplash && <SplashScreen onDone={handleSplashDone} />}
          <Router>
            <AppLayout splashActive={showSplash} />
          </Router>
        </CartProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
};

export default App;
