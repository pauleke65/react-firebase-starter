import React, { useEffect, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { auth } from '../../firebase/clientApp';

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', {});

  useEffect(() => {
    auth.onAuthStateChanged((id) => {
      setUser(id);
    });
  }, []);

  const value = useMemo(() => ({ user, setUser }), []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUser };
