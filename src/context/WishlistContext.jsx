import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (book) => {
    setWishlist(prev =>
      prev.find(b => b.id === book.id) ? prev : [...prev, book]
    );
  };

  const removeFromWishlist = (bookId) => {
    setWishlist(prev => prev.filter(b => b.id !== bookId));
  };

  const isInWishlist = (bookId) => wishlist.some(b => b.id === bookId);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
