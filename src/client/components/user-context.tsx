import React, { useEffect, useMemo, createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { auth } from "../../firebase/clientApp";
import { User } from "firebase/auth";

interface UserContextState {
  user: User | null;
  setUser: (data: any) => void;
}

export const UserContext = createContext<UserContextState | null>(null);

function UserProvider({ children }:{children: any}) {
  const [user, setUser] = useLocalStorage("user", {});

  useEffect(() => {
    auth.onAuthStateChanged((id) => {
      setUser(id);
    });
  }, []);

  const value = useMemo(() => ({ user, setUser }), []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
