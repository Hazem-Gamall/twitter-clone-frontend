import useAuth from "./useAuth";
import { unAuthinticatedApiClient } from "../services/apiClient";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  return async () => {
    try {
      const response = await unAuthinticatedApiClient.post(
        "http://localhost:8000/api/token/refresh/",
        {
          refresh: auth && auth.refresh,
        }
      );

      setAuth && setAuth({ ...auth, ...response.data });
      return response.data.access;
    } catch (e) {
      setAuth && setAuth(undefined);
      return;
    }
  };
};

export default useRefreshToken;
