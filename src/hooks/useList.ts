import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import { HttpService } from "../services/HttpService";

const useData = <T>(httpService: HttpService, deps?: [any]) => {
  const [data, setData] = useState<T[]>(Object);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(
    () => {
      setIsLoading(true);
      const { request, cancel } = httpService.list<T>();
      request
        .then((resp) => {
          if (resp) {
            setData(resp?.data);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          if (error instanceof CanceledError) return;
          setError(error.message);
          setIsLoading(false);
        });
      return () => cancel();
    },
    deps ? [...deps] : []
  );
  return { data, isLoading, setData, error };
};

export default useData;
