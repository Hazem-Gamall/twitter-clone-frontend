import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import apiClient from "../services/apiClient";
import useRefreshToken from "./useRefreshToken";

const useApiClient = () => {
  const { auth } = useContext(AuthContext);
  const getToken = useRefreshToken();
  useEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        console.log(config);

        if (!config.headers.Authorization)
          config.headers.Authorization = `Bearer ${auth.access}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          if (prevRequest) {
            prevRequest.sent = true;
            const access = await getToken();
            prevRequest.headers.Authorization = `Bearer ${access}`;
            return apiClient(prevRequest);
          }
          return Promise.reject(error);
        }
      }
    );
    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [auth]);
  return apiClient;
};

export default useApiClient;
