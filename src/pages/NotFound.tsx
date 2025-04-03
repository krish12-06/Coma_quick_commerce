
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-blue-50 to-gray-100">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl font-medium mb-6">Oops! Page not found</p>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Button asChild size="lg">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
