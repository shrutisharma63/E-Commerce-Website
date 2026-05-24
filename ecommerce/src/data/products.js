// Sample product data with real clothing images
export const products = [
  // Electronics
  {
    id: 1,
    brand: 'Sony',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 4150,
    originalPrice: 6640,
    discount: 37,
    image: '🎧',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    description: 'High-quality wireless headphones with noise cancellation'
  },
  {
    id: 2,
    brand: 'Apple',
    name: 'Smart Watch',
    category: 'Electronics',
    price: 16600,
    originalPrice: 24900,
    discount: 33,
    image: '⌚',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    description: 'Track your fitness and receive notifications'
  },
  {
    id: 3,
    brand: 'Anker',
    name: 'USB-C Cable',
    category: 'Electronics',
    price: 1080,
    originalPrice: 1660,
    discount: 35,
    image: '🔌',
    imageUrl: 'https://images.unsplash.com/photo-1625948515291-69613efd103f',
    description: 'Durable USB-C charging cable'
  },
  {
    id: 4,
    brand: 'Samsung',
    name: 'Power Bank',
    category: 'Electronics',
    price: 2490,
    originalPrice: 4150,
    discount: 40,
    image: '🔋',
    imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5',
    description: 'Portable power bank 20000mAh'
  },

  // Clothing
  {
    id: 5,
    brand: 'H&M',
    name: 'Classic White T-Shirt',
    category: 'Clothing',
    price: 1245,
    originalPrice: 2490,
    discount: 50,
    image: '👕',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    description: 'Comfortable 100% cotton t-shirt',
    featured: true
  },
  {
    id: 6,
    brand: 'Levi\'s',
    name: 'Blue Denim Jeans',
    category: 'Clothing',
    price: 3320,
    originalPrice: 5810,
    discount: 43,
    image: '👖',
    imageUrl: 'https://images.unsplash.com/photo-1542272453-a0ae3b65aca7',
    description: 'Classic blue denim jeans with perfect fit',
    featured: true
  },
  {
    id: 7,
    brand: 'Nike',
    name: 'Sports Running Shoes',
    category: 'Clothing',
    price: 4980,
    originalPrice: 8300,
    discount: 40,
    image: '👟',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    description: 'Lightweight running shoes with comfort support',
    featured: true
  },
  {
    id: 8,
    brand: 'The North Face',
    name: 'Winter Parka Jacket',
    category: 'Clothing',
    price: 7470,
    originalPrice: 14940,
    discount: 50,
    image: '🧥',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5',
    description: 'Warm and waterproof winter jacket',
    featured: true
  },

  // Books
  {
    id: 9,
    brand: 'Penguin',
    name: 'JavaScript Guide',
    category: 'Books',
    price: 2073,
    originalPrice: 2905,
    discount: 29,
    image: '📖',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765',
    description: 'Complete guide to JavaScript programming'
  },
  {
    id: 10,
    brand: 'O\'Reilly',
    name: 'React Handbook',
    category: 'Books',
    price: 2905,
    originalPrice: 3735,
    discount: 22,
    image: '📚',
    imageUrl: 'https://images.unsplash.com/photo-1543002588-d83cedbc4656',
    description: 'Learn React from basics to advanced'
  },
  {
    id: 11,
    brand: 'Packt',
    name: 'Web Design Basics',
    category: 'Books',
    price: 1660,
    originalPrice: 2490,
    discount: 33,
    image: '📕',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583f7270bfba',
    description: 'Master responsive web design'
  },
  {
    id: 12,
    brand: 'Apress',
    name: 'CSS Mastery',
    category: 'Books',
    price: 2490,
    originalPrice: 3320,
    discount: 25,
    image: '📗',
    imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e3ffe02',
    description: 'Advanced CSS techniques and tips'
  }
];

// Get unique categories for tabs
export const getCategories = () => {
  const categories = [...new Set(products.map(product => product.category))];
  return ['All', ...categories];
};
