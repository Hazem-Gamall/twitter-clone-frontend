import { useEffect, useState } from "react";
import { HttpService } from "../services/HttpService";
import { CanceledError } from "axios";

const useRetrieve = <T>(httpService: HttpService, id: string, deps?: [any]) => {
  const [data, setData] = useState<T>(Object);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(
    () => {
      setIsLoading(true);
      const { request, cancel } = httpService.retrieve<T>(id);
      request
        .then((resp) => {
          setData(resp.data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error instanceof CanceledError) return;
          setIsLoading(false);
          setError(error.message);
        });

      return () => cancel();
    },
    deps ? [...deps] : []
  );

  return { data, isLoading, error };
};

export default useRetrieve;
