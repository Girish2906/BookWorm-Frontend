// ExploreLoginContext.js (or a similar name)
import React, { createContext, useContext, useState } from 'react';

const ExploreLoginContext = createContext();

export const ExploreLoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [showLoginAnimation, setShowLoginAnimation] = useState(false);

  const contextValue = {
    isLogin,
    setIsLogin,
    showLoginAnimation,
    setShowLoginAnimation,
  };

  return (
    <ExploreLoginContext.Provider value={contextValue}>
      {children}
    </ExploreLoginContext.Provider>
  );
};

export const useExploreLogin = () => useContext(ExploreLoginContext);