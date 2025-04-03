
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling wireless headphones with 20 hours of battery life.",
    price: 199.99,
    imageUrl: "/placeholder.svg",
    category: "electronics",
    inventory: 50
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this waterproof smartwatch featuring heart rate monitoring.",
    price: 149.99,
    imageUrl: "/placeholder.svg",
    category: "electronics",
    inventory: 35
  },
  {
    id: "3",
    name: "Organic Cotton T-shirt",
    description: "Comfortable and sustainable cotton t-shirt, perfect for everyday wear.",
    price: 24.99,
    imageUrl: "/placeholder.svg",
    category: "clothing",
    inventory: 100
  },
  {
    id: "4",
    name: "Professional Chef's Knife",
    description: "High-carbon stainless steel chef's knife for precise cutting and chopping.",
    price: 79.99,
    imageUrl: "/placeholder.svg",
    category: "kitchen",
    inventory: 20
  },
  {
    id: "5",
    name: "Ergonomic Office Chair",
    description: "Adjustable office chair with lumbar support for comfortable all-day sitting.",
    price: 249.99,
    imageUrl: "/placeholder.svg",
    category: "furniture",
    inventory: 15
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    description: "Waterproof speaker with 360° sound and 12-hour battery life.",
    price: 89.99,
    imageUrl: "/placeholder.svg",
    category: "electronics",
    inventory: 40
  },
  {
    id: "7",
    name: "Digital Drawing Tablet",
    description: "Pressure-sensitive drawing tablet for digital artists and designers.",
    price: 199.99,
    imageUrl: "/placeholder.svg",
    category: "electronics",
    inventory: 25
  },
  {
    id: "8",
    name: "Stainless Steel Water Bottle",
    description: "Double-walled insulated bottle keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 34.99,
    imageUrl: "/placeholder.svg",
    category: "accessories",
    inventory: 75
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery)
  );
};
