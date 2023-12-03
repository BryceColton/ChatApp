// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleSignIn = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, handleSignIn, handleSignOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
