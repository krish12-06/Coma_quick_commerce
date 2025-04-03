
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { formatPrice, truncateText } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      duration: 2000,
    });
  };

  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative h-60 bg-gray-50 overflow-hidden rounded-t-lg">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          {product.inventory <= 3 && product.inventory > 0 && (
            <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
              Only {product.inventory} left
            </div>
          )}
          {product.inventory === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg text-left truncate">{product.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 h-10 text-left">{truncateText(product.description, 60)}</p>
            </div>
            <span className="font-semibold text-lg">{formatPrice(product.price)}</span>
          </div>
          <div className="mt-3 flex items-center text-sm text-left">
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">{product.category}</span>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4 pt-0 flex items-center gap-2">
        <Button 
          onClick={handleAddToCart}
          className="w-full gap-2 transition-all"
          disabled={product.inventory <= 0}
          variant={product.inventory <= 0 ? "outline" : "default"}
        >
          <ShoppingBag className="h-4 w-4" />
          {product.inventory > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
