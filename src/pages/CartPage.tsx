
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CartPage = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=/checkout');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b bg-gray-50">
                  <div className="col-span-6 font-medium">Product</div>
                  <div className="col-span-2 font-medium text-center">Price</div>
                  <div className="col-span-2 font-medium text-center">Quantity</div>
                  <div className="col-span-2 font-medium text-right">Total</div>
                </div>
                
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                      {/* Product */}
                      <div className="col-span-6 flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link to={`/products/${item.product.id}`} className="font-medium hover:text-primary">
                            {item.product.name}
                          </Link>
                          <div className="md:hidden mt-1 text-sm text-gray-600">
                            {formatPrice(item.product.price)} each
                          </div>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="hidden md:block col-span-2 text-center">
                        {formatPrice(item.product.price)}
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-2">
                        <div className="flex items-center justify-center">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <MinusIcon className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.inventory}
                          >
                            <PlusIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="col-span-1 md:col-span-2 text-right flex justify-between md:justify-end items-center">
                        <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.product.id)}
                          className="text-gray-400 hover:text-red-500 ml-4"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <Button variant="outline" onClick={() => navigate('/products')}>
                  Continue Shopping
                </Button>
                <Button variant="ghost" onClick={() => clearCart()}>
                  Clear Cart
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="border-t border-b py-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{total >= 50 ? 'Free' : formatPrice(10)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between mt-4 font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total >= 50 ? total : total + 10)}</span>
                </div>
                
                <Button className="w-full mt-6" size="lg" onClick={handleCheckout}>
                  Checkout
                </Button>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Free shipping on orders over $50
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default CartPage;
