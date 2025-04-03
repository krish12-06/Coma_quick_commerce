
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products, getProductsByCategory, searchProducts } from '@/data/products';
import { Product } from '@/types';
import { Check, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('q');
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortOrder, setSortOrder] = useState<string>("featured");
  
  const categories = [...new Set(products.map(p => p.category))];
  
  useEffect(() => {
    let result: Product[] = [...products];
    
    // Apply category filter if present
    if (categoryParam) {
      result = getProductsByCategory(categoryParam);
    }
    
    // Apply search query if present
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }
    
    // Apply sorting
    result = sortProducts(result, sortOrder);
    
    setFilteredProducts(result);
  }, [categoryParam, searchQuery, sortOrder]);
  
  const sortProducts = (productsToSort: Product[], order: string): Product[] => {
    const sorted = [...productsToSort];
    
    switch (order) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default: // "featured"
        return sorted;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {categoryParam 
                ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Products` 
                : searchQuery 
                  ? `Search Results for "${searchQuery}"` 
                  : "All Products"}
            </h1>
            <p className="text-gray-600 mt-2">{filteredProducts.length} products found</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="mr-2 text-gray-700">Sort by:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  {sortOrder === "featured" && "Featured"}
                  {sortOrder === "price-asc" && "Price: Low to High"}
                  {sortOrder === "price-desc" && "Price: High to Low"}
                  {sortOrder === "name" && "Name"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                  <DropdownMenuRadioItem value="featured">
                    Featured
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-asc">
                    Price: Low to High
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-desc">
                    Price: High to Low
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name">
                    Name
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-medium text-lg mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/products"
                    className={`flex items-center ${!categoryParam ? 'text-primary font-medium' : ''}`}
                  >
                    {!categoryParam && <Check className="mr-2 h-4 w-4" />}
                    <span className={!categoryParam ? 'ml-6' : ''}>All Products</span>
                  </a>
                </li>
                {categories.map(category => (
                  <li key={category}>
                    <a 
                      href={`/products?category=${category}`}
                      className={`flex items-center ${categoryParam === category ? 'text-primary font-medium' : ''}`}
                    >
                      {categoryParam === category && <Check className="mr-2 h-4 w-4" />}
                      <span className={categoryParam === category ? 'ml-6' : ''}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600">Try changing your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ProductsPage;
