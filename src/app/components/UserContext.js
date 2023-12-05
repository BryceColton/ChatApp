// UserContext.js
import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ user, children }) => {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  // if (!context) {
  //   throw new Error('useUser must be used within a UserProvider');
  // }
  return context;
};
