import { createContext, useState } from "react";

export interface IAuthContext {
  access?: string;
  refresh?: string;
  username?: string;
  [propName: string]: any;
}

const AuthContext = createContext<IAuthContext>({});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const localStorageAuth = localStorage.getItem("auth");
  const [auth, setAuth] = useState(
    localStorageAuth ? JSON.parse(localStorageAuth) : {}
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
