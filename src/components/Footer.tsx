
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">QuickCommerce</h3>
            <p className="text-gray-300">
              Your one-stop shop for quality products at competitive prices.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-300 hover:text-white">All Products</Link></li>
              <li><Link to="/products?category=electronics" className="text-gray-300 hover:text-white">Electronics</Link></li>
              <li><Link to="/products?category=clothing" className="text-gray-300 hover:text-white">Clothing</Link></li>
              <li><Link to="/products?category=kitchen" className="text-gray-300 hover:text-white">Kitchen</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-gray-300 hover:text-white">Login</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-white">Register</Link></li>
              <li><Link to="/orders" className="text-gray-300 hover:text-white">Order History</Link></li>
              <li><Link to="/profile" className="text-gray-300 hover:text-white">My Profile</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-gray-300">
              <p>123 Commerce St.</p>
              <p>Anytown, ST 12345</p>
              <p className="mt-2">support@quickcommerce.com</p>
              <p>(555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 QuickCommerce. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/terms" className="text-gray-400 hover:text-white">Terms</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy</Link>
            <Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
