import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  userType: 'student' | 'sag' | 'finance';
  contactNumber: string;
  address: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  contactNumber: string;
  address: string;
  userType: 'student' | 'sag' | 'finance';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john@student.com',
    userType: 'student',
    contactNumber: '+1234567890',
    address: '123 Student St, University City'
  },
  {
    id: '2',
    fullName: 'Sarah Admin',
    email: 'sarah@sag.gov',
    userType: 'sag',
    contactNumber: '+1234567891',
    address: '456 Government St, Capital City'
  },
  {
    id: '3',
    fullName: 'Mike Finance',
    email: 'mike@finance.gov',
    userType: 'finance',
    contactNumber: '+1234567892',
    address: '789 Treasury St, Capital City'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app this would be an API call
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      const mockToken = `mock-jwt-${foundUser.id}`;
      setUser(foundUser);
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    // Mock registration - in real app this would be an API call
    const newUser: User = {
      id: Date.now().toString(),
      ...userData
    };
    
    mockUsers.push(newUser);
    const mockToken = `mock-jwt-${newUser.id}`;
    setUser(newUser);
    setToken(mockToken);
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      logout,
      isLoading
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