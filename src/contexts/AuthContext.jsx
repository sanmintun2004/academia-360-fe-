import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on app load
    const token = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    const userData = localStorage.getItem('userData');

    if (token && storedUserType && userData) {
      setUser(JSON.parse(userData));
      setUserType(storedUserType);
    }
    setLoading(false);
  }, []);

  const login = (userData, userType, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userType', userType);
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(userData);
    setUserType(userType);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    setUser(null);
    setUserType(null);
  };

  const isAuthenticated = () => {
    return !!user && !!userType;
  };

  const isAdmin = () => {
    return userType === 'admin';
  };

  const value = {
    user,
    userType,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
