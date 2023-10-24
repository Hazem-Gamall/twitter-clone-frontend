import useApiClient from "../hooks/useApiClient";
import { HttpService } from "./HttpService";
import UserWithImageService from "./UserWithImageService";

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

export const userWithImageServiceFactory = () => {
  const apiClient = useApiClient();
  return new UserWithImageService(`/users`, apiClient);
};

export const userPostsServiceFactory = (username: string) => {
  return httpServiceFactory(HttpService, `/users/${username}/posts/`);
};
