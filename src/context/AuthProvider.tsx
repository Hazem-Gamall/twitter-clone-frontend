import { createContext, useState } from "react";
import getObjectFromJWT from "../utils/getObjectFromJwt";
import axios from "axios";

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
  const [auth, _setAuth] = useState(
    localStorageAuth ? JSON.parse(localStorageAuth) : {}
  );
  const setAuth = async (auth: IAuthContext) => {
    try {
      const username = getObjectFromJWT(auth.access)?.username;
      const userProfile = (
        await axios.get(`http://localhost:8000/api/users/${username}/`, {
          headers: { Authorization: `Bearer ${auth.access}` },
        })
      ).data;
      const newAuth = { ...auth, username, userProfile };
      localStorage.setItem("auth", JSON.stringify(newAuth));
      _setAuth(newAuth);
    } catch (e) {
      console.log("error during setting auth", e);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
