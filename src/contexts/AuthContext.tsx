
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: "user1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User"
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for stored authentication on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock authentication logic
    const matchedUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (matchedUser) {
      const { password, ...userWithoutPassword } = matchedUser;
      const userData = {
        id: userWithoutPassword.id,
        email: userWithoutPassword.email,
        name: userWithoutPassword.name
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });
      
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive"
      });
      
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      toast({
        title: "Registration failed",
        description: "This email address is already in use.",
        variant: "destructive"
      });
      return false;
    }
    
    // In a real app, this would be a server-side action
    // For demo purposes, we'll just simulate successful registration
    const newUser = {
      id: `user${MOCK_USERS.length + 1}`,
      email,
      name
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    toast({
      title: "Registration successful",
      description: `Welcome, ${name}!`,
    });
    
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: user !== null,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
