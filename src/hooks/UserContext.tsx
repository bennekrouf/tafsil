import { ReactNode, createContext, useContext, useState } from 'react';

export interface UserContextType {
    user: { email: string; appId: string };
    setUser: React.Dispatch<React.SetStateAction<{ email: string; appId: string }>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({ email: 'mohamed.bennekrouf@gmail.com', appId: 'tafsil' });
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
