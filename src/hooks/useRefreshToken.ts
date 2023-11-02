import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  return async () => {
    try {
      const response = await axios.post(
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
