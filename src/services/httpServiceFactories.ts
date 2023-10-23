import useApiClient from "../hooks/useApiClient";
import { HttpService } from "./HttpService";

const httpServiceFactory = (
  httpServiceClass: typeof HttpService,
  endpoint: string
) => {
  const apiClient = useApiClient();
  return new httpServiceClass(endpoint, apiClient);
};

export const userServiceFactory = () => {
  return httpServiceFactory(HttpService, "/users");
};

export const userPostsServiceFactory = (username: string) => {
  return httpServiceFactory(HttpService, `/users/${username}/posts/`);
};
