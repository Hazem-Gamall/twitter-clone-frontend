import { useContext } from "react";
import AuthContext, { IAuthContext } from "../context/AuthProvider";

const useAuth = () => {
  const { auth, setAuth } = useContext<IAuthContext>(AuthContext);

  return {
    auth,
    setAuth: (data: any) => {
      if (Object.keys(data).length === 0) localStorage.removeItem("auth");
      else localStorage.setItem("auth", JSON.stringify(data));
      setAuth(data);
    },
  };
};

export default useAuth;
