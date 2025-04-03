
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { Folder, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const categories = [...new Set(products.map(p => p.category))];

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Product Categories</h1>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <div 
              key={category}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all hover-scale"
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex justify-center">
                {category === "electronics" && (
                  <Grid3X3 size={64} className="text-white" />
                )}
                {category !== "electronics" && (
                  <Folder size={64} className="text-white" />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold capitalize mb-2">{category}</h3>
                <p className="text-gray-600 mb-4">
                  Browse our selection of {category}
                </p>
                <Button onClick={() => handleCategoryClick(category)} className="w-full">
                  Explore {category}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
