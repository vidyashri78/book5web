import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (book) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === book.id);
      if (existing) return prev.map(i => i.id === book.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...book, qty: 1 }];
    });
  };

  const removeFromCart = (bookId) => setCart(prev => prev.filter(i => i.id !== bookId));

  const updateQty = (bookId, qty) => {
    if (qty < 1) return removeFromCart(bookId);
    setCart(prev => prev.map(i => i.id === bookId ? { ...i, qty } : i));
  };

  const clearCart = () => setCart([]);

  const placeOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => { setOrderPlaced(false); clearCart(); }, 3500);
  };

  const isInCart = (bookId) => cart.some(i => i.id === bookId);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty,
      clearCart, placeOrder, isInCart,
      totalItems, totalPrice, orderPlaced,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
