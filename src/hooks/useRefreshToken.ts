import useAuth from "./useAuth";
import { unAuthinticatedApiClient } from "../services/apiClient";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  return async () => {
    try {
      const response = await unAuthinticatedApiClient.post(
        "http://localhost:8000/api/token/refresh/",
        {
          refresh: auth.refresh,
        }
      );

      setAuth({ ...auth, ...response.data });
      return response.data.access;
    } catch (e) {
      setAuth({});
      return;
    }
  };
};

export default useRefreshToken;
