import { useState, useCallback, useMemo } from 'react';

export interface Product {
  id: string;
  name: string;
  oldPrice: number;
  newPrice: number;
  img: string;
  shop: string;
  category?: string;
  description?: string;
}

const mockProducts: Product[] = [
  { id: 'p1', name: 'iPhone 15 Pro 256GB', oldPrice: 1299, newPrice: 1149, img: '/img/iphone.png', shop: 'Amazon', category: 'electronics' },
  { id: 'p2', name: 'MacBook Air M3', oldPrice: 1499, newPrice: 1379, img: '/img/macbook.png', shop: 'MediaMarkt', category: 'electronics' },
  { id: 'p3', name: 'Sony WH-1000XM5', oldPrice: 399, newPrice: 319, img: '/img/sony.png', shop: 'eBay', category: 'electronics' },
  { id: 'p4', name: 'Samsung 4K Monitor', oldPrice: 599, newPrice: 479, img: '/img/monitor.png', shop: 'Best Buy', category: 'electronics' },
  { id: 'p5', name: 'iPad Pro 11"', oldPrice: 899, newPrice: 749, img: '/img/ipad.png', shop: 'Apple Store', category: 'electronics' },
  { id: 'p6', name: 'Nike Air Max 270', oldPrice: 149, newPrice: 119, img: '/img/nike.png', shop: 'Nike Store', category: 'fashion' },
  { id: 'p7', name: 'Dyson V15 Vacuum', oldPrice: 749, newPrice: 599, img: '/img/dyson.png', shop: 'Amazon', category: 'home' },
  { id: 'p8', name: 'Canon EOS R6', oldPrice: 2499, newPrice: 2199, img: '/img/canon.png', shop: 'B&H Photo', category: 'electronics' },
];

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (!query || query.length < 2) return [];
    
    return mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.shop.toLowerCase().includes(query.toLowerCase()) ||
      product.category?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const searchProducts = useCallback(async (searchQuery: string) => {
    setIsLoading(true);
    setQuery(searchQuery);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setIsLoading(false);
  }, []);

  const selectProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    setQuery(product.name);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setSelectedProduct(null);
  }, []);

  return {
    query,
    setQuery,
    isLoading,
    filteredProducts,
    selectedProduct,
    searchProducts,
    selectProduct,
    clearSearch,
    allProducts: mockProducts
  };
}; 