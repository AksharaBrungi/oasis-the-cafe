import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MenuItem, CartItem } from "../types";

interface AppContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  isBookTableOpen: boolean;
  cartItemsMap: Record<string, number>;
  totalCartCount: number;
  totalCartAmount: number;

  handleAddToCart: (item: MenuItem) => void;
  handleUpdateCartQuantity: (itemId: string, delta: number) => void;
  handleRemoveFromCart: (itemId: string) => void;
  handleClearCart: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsBookTableOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Saved cart in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("oasis_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookTableOpen, setIsBookTableOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("oasis_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartItemsMap: Record<string, number> = {};
  cartItems.forEach((i) => {
    cartItemsMap[i.menuItem.id] = i.quantity;
  });

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.menuItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((i) => {
          if (i.menuItem.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        isCartOpen,
        isBookTableOpen,
        cartItemsMap,
        totalCartCount,
        totalCartAmount,
        handleAddToCart,
        handleUpdateCartQuantity,
        handleRemoveFromCart,
        handleClearCart,
        setIsCartOpen,
        setIsBookTableOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
