
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useParams, Link } from 'react-router-dom';
import { formatPrice, formatDate } from '@/lib/utils';
import { ArrowLeft, Package, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Steps, Step } from '@/components/Steps';

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch order details from an API
    // For demo purposes, we're using localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = storedOrders.find((o: any) => o.id === id);
    
    // Simulate API delay
    setTimeout(() => {
      setOrder(foundOrder || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center flex-1">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white p-8 text-center shadow-sm rounded-lg border">
            <h2 className="text-xl font-bold mb-4">Order not found</h2>
            <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or has been removed.</p>
            <Link to="/orders" className="text-primary hover:underline">
              Back to Orders
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Determine current order status step
  const getOrderStep = (status?: string) => {
    switch (status) {
      case 'delivered':
        return 3;
      case 'shipped':
        return 2;
      case 'processing':
        return 1;
      default:
        return 0; // Order placed
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center">
          <Link to="/orders" className="flex items-center text-gray-600 hover:text-primary">
            <ArrowLeft size={16} className="mr-2" />
            Back to Orders
          </Link>
          <Separator orientation="vertical" className="mx-4 h-6" />
          <h1 className="text-2xl font-bold">Order {order.id}</h1>
          <div className="ml-auto">
            <Badge variant={order.status === 'delivered' ? 'default' : 'outline'}>
              {order.status || 'Processing'}
            </Badge>
          </div>
        </div>
        
        {/* Order Progress Tracker */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>
              Ordered on {formatDate(new Date(order.date))}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Steps currentStep={getOrderStep(order.status)}>
              <Step icon={<Package size={18} />} title="Order Placed" description="We've received your order" />
              <Step icon={<Package size={18} />} title="Processing" description="Your order is being prepared" />
              <Step icon={<Truck size={18} />} title="Shipped" description="Your order is on its way" />
              <Step icon={<CheckCircle size={18} />} title="Delivered" description="Your order has arrived" />
            </Steps>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Items in Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {order.items.map((item: any) => (
                    <div key={item.product.id} className="py-4 flex items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <Link to={`/products/${item.product.id}`} className="font-medium hover:text-primary">
                          {item.product.name}
                        </Link>
                        <div className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatPrice(item.product.price)} each
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(order.total - (order.shipping || 0))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{order.shipping ? formatPrice(order.shipping) : 'Free'}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Shipping Details</CardTitle>
              </CardHeader>
              <CardContent>
                <address className="not-italic">
                  <div className="font-medium">{order.address?.name || 'Shipping Address'}</div>
                  <p>{order.address?.street}</p>
                  <p>
                    {order.address?.city}, {order.address?.state} {order.address?.postalCode}
                  </p>
                  <p>{order.address?.country}</p>
                </address>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button variant="outline" asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default OrderDetailPage;
