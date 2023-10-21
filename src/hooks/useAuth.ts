import { useContext } from "react";
import AuthContext, { IAuthContext } from "../context/AuthProvider";

const useAuth = () => {
  return useContext<IAuthContext>(AuthContext);
};

export default useAuth;
