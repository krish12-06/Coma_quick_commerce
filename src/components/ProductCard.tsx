
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="h-48 bg-gray-100 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg truncate">{product.name}</h3>
          <p className="text-gray-500 text-sm line-clamp-2 h-10">{product.description}</p>
          <div className="mt-2 font-semibold">{formatPrice(product.price)}</div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button 
          onClick={(e) => {
            e.preventDefault();
            addItem(product, 1);
          }}
          className="w-full"
          disabled={product.inventory <= 0}
        >
          {product.inventory > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
