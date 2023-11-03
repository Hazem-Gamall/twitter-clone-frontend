import { useContext } from "react";
import AuthContext, { IAuthContext } from "../context/AuthProvider";

const useAuth = () => {
  const { auth, setAuth } = useContext<IAuthContext>(AuthContext);

  return {
    auth,
    setAuth,
  };
};

export default useAuth;
