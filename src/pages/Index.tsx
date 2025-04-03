
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const featuredProducts = products.slice(0, 4);
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Shop Smarter, Not Harder
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Discover quality products at competitive prices with our fast, reliable shipping and exceptional customer service.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="text-lg">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Categories */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(category => (
              <Link 
                key={category}
                to={`/products?category=${category}`}
                className="bg-white rounded-lg p-6 shadow-md text-center transition-transform hover:scale-105"
              >
                <div className="capitalize text-lg font-medium">{category}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for exclusive deals, new product announcements, and more!
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
