
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getProductById } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = id ? getProductById(id) : null;
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= product.inventory) {
      setQuantity(newQuantity);
    }
  };
  
  // Find related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-auto object-contain" 
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="text-2xl font-semibold text-primary mb-4">
              {formatPrice(product.price)}
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <div className="font-medium mb-2">Availability:</div>
              {product.inventory > 0 ? (
                <span className="text-green-600">In Stock ({product.inventory} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
            
            <div className="mb-6">
              <div className="font-medium mb-2">Quantity:</div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="mx-4 text-xl w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.inventory}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Button 
              size="lg"
              onClick={() => addItem(product, quantity)}
              disabled={product.inventory <= 0}
              className="w-full md:w-auto"
            >
              Add to Cart
            </Button>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetail;
