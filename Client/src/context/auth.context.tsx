import { createContext, useEffect, useState } from "react";
import type { IUser } from "../types/user.types";

interface IAuthContextType {
  user: IUser | null;
  isLoading: boolean;
  token: string | null;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
}

const defaultValues = {
  user: null,
  isLoading: true,
  token: null,
  setUser: () => {},
  setToken: () => {},
};

//1. create context

export const AuthContext = createContext<IAuthContextType>(defaultValues);
// 2. context provider

export const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  //manage state here

  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  //use effect

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const access_token = localStorage.getItem("access_token");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(access_token);
      } catch (error: any) {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        console.log("Failed to parse Json Data", error);
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

//to use context

//const{} = useContext(context_name)

//const {user} = useContext(AuthContext)
