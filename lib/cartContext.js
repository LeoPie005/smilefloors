'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createCart, addToCart, updateCartLine, removeFromCart } from './shopify';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCartId = localStorage.getItem('sf_cart_id');
    if (savedCartId) setCartId(savedCartId);
  }, []);

  const initCart = useCallback(async () => {
    if (cartId) return cartId;
    const newCart = await createCart();
    if (newCart) {
      setCart(newCart);
      setCartId(newCart.id);
      localStorage.setItem('sf_cart_id', newCart.id);
      return newCart.id;
    }
    return null;
  }, [cartId]);

  const addItem = useCallback(async (variantId, quantity = 1) => {
    setLoading(true);
    try {
      const id = await initCart();
      if (!id) return;
      const updatedCart = await addToCart(id, variantId, quantity);
      setCart(updatedCart);
      setIsOpen(true);
      toast.success('Added to cart!');
    } catch (e) {
      toast.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  }, [initCart]);

  const updateItem = useCallback(async (lineId, quantity) => {
    if (!cartId) return;
    setLoading(true);
    try {
      const updatedCart = await updateCartLine(cartId, lineId, quantity);
      setCart(updatedCart);
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  const removeItem = useCallback(async (lineId) => {
    if (!cartId) return;
    setLoading(true);
    try {
      const updatedCart = await removeFromCart(cartId, [lineId]);
      setCart(updatedCart);
      toast.success('Removed from cart');
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  const cartLines = cart?.lines?.edges?.map(({ node }) => node) ?? [];
  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const cartTotal = cart?.cost?.totalAmount?.amount ?? '0';
  const cartCurrency = cart?.cost?.totalAmount?.currencyCode ?? 'USD';

  return (
    <CartContext.Provider value={{
      cart, cartLines, cartCount, cartTotal, cartCurrency,
      isOpen, setIsOpen, loading, addItem, updateItem, removeItem,
      checkoutUrl: cart?.checkoutUrl,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
