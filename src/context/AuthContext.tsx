
import React, { createContext, useState, useContext, useEffect } from "react";

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface User {
  email: string;
  pharmacy: Pharmacy;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("medicfinder_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock validation - in a real app this would be an API call
    if (email && password) {
      // Mock user data
      const mockUser: User = {
        email,
        pharmacy: {
          id: "pharm-123",
          name: "Pharmacie du Baobab",
          address: "123 Avenue Léopold Sédar Senghor, Dakar",
          phone: "+221 33 123 4567",
          hours: "Lun-Sam: 8h-22h, Dim: 9h-20h",
          location: {
            lat: 14.7167,
            lng: -17.4677,
          },
        },
      };
      
      setUser(mockUser);
      localStorage.setItem("medicfinder_user", JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("medicfinder_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
