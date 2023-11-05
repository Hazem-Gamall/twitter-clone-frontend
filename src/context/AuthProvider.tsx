import { createContext, useState } from "react";
import getObjectFromJWT from "../utils/getObjectFromJwt";
import { unAuthinticatedApiClient } from "../services/apiClient";
import { IUserProfile } from "../types/User";

export interface IAuth {
  access: string;
  refresh: string;
  username: string;
  userProfile: IUserProfile;
}

export interface IAuthPartial extends Partial<IAuth> {}

export interface IAuthContext {
  auth?: IAuth;
  setAuth?: (auth: IAuthPartial | undefined) => void;
  [propName: string]: any;
}

const AuthContext = createContext<IAuthContext>({});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const localStorageAuth = localStorage.getItem("auth");
  const [auth, _setAuth] = useState<IAuth | undefined>(
    localStorageAuth ? JSON.parse(localStorageAuth) : {}
  );
  const setAuth = async (auth: IAuthPartial | undefined) => {
    if (!auth) {
      localStorage.removeItem("auth");
      _setAuth(auth);
      return;
    }
    try {
      let username = getObjectFromJWT(auth.access)?.username;
      if (!username) throw new Error("username inavlid");
      username = username as string;
      const userProfile = (
        await unAuthinticatedApiClient.get(`/users/${username}/`, {
          headers: { Authorization: `Bearer ${auth.access}` },
        })
      ).data;
      const newAuth = { ...auth, username, userProfile } as IAuth;
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
