import { useEffect, useState } from "react";
import useApiClient from "./useApiClient";

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T>(Object);
  const apiClient = useApiClient();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get<T>(endpoint)
      .then((resp) => {
        setData(resp.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);
  return { data, isLoading, error };
};

export default useData;
