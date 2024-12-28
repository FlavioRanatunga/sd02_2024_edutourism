import React, { createContext, useContext, useState } from 'react';

const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [id, setId] = useState(null);
  return (
    <UserIdContext.Provider value={{ id, setId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserId = () => {
  return useContext(UserIdContext);
};