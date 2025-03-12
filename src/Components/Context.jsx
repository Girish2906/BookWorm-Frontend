// ExploreLoginContext.js (or a similar name)
import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ExploreLoginContext = createContext();

export const ExploreLoginProvider = ({ children }) => {
  const user = useSelector(state => state.user) ; 
  const [isLogin, setIsLogin] = useState(user?.data ? true : false);
  const [showLoginAnimation, setShowLoginAnimation] = useState(false);

  
  useEffect(() => {
  console.log("from the context" , user , user.data) ; 

    setIsLogin(!!user?.data);
  }, [user]);

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