'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { type Product } from '@/lib/products';

interface NewProductContextType {
  newProducts: Product[];
  addProduct: (product: Product) => void;
}

const NewProductContext = createContext<NewProductContextType | undefined>(
  undefined
);

export function NewProductProvider({ children }: { children: ReactNode }) {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setNewProducts((prevProducts) => [product, ...prevProducts]);
  };

  return (
    <NewProductContext.Provider value={{ newProducts, addProduct }}>
      {children}
    </NewProductContext.Provider>
  );
}

export function useNewProduct() {
  const context = useContext(NewProductContext);
  if (context === undefined) {
    throw new Error('useNewProduct must be used within a NewProductProvider');
  }
  return context;
}
