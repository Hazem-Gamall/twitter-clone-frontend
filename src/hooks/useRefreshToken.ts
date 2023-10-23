import apiClient from "../services/apiClient";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  return async () => {
    try {
      const response = await apiClient.post("/token/refresh/", {
        refresh: auth.refresh,
      });

      setAuth({ ...auth, ...response.data });
      return response.data.access;
    } catch (e) {
      console.log("error refresh token", e);
    }
  };
};

export default useRefreshToken;
