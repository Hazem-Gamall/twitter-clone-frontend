import useApiClient from "../hooks/useApiClient";
import { HttpService } from "./HttpService";
import UserPostWithImageService from "./UserPostWithImageService";
import UserWithImageService from "./UserWithImageService";

export const httpServiceFactory = (
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
  return httpServiceFactory(HttpService, `/users/${username}/posts`);
};

export const userTimelineServiceFactory = (username: string) => {
  return httpServiceFactory(HttpService, `/users/${username}/posts/timeline`);
};

export const userPostLikeServiceFactory = (username: string) => {
  return httpServiceFactory(HttpService, `/users/${username}/likes`);
};

export const userPostRepostServiceFactory = (username: string) => {
  return httpServiceFactory(HttpService, `/users/${username}/repost`);
};

export const userPostReplyServiceFactory = (post_id: number) => {
  return httpServiceFactory(HttpService, `/posts/${post_id}/replies`);
};

export const userPostWithImageService = (username: string) => {
  const apiClient = useApiClient();
  return new UserPostWithImageService(`/users/${username}/posts`, apiClient);
};

export const userFollowingService = (username: string) => {
  return httpServiceFactory(HttpService, `/users/${username}/following`);
};

export const userChatsServiceFactory = (username: string) => {
  return httpServiceFactory(HttpService, `/users/${username}/chats`);
};

export const userChatMessagesServiceFactory = (
  username: string,
  chat_id: number
) => {
  return httpServiceFactory(
    HttpService,
    `/users/${username}/chats/${chat_id}/messages`
  );
};

export const postsServiceFatory = () => {
  return httpServiceFactory(HttpService, `/posts`);
};

export const postRepliesServiceFatory = (post_id: number) => {
  return httpServiceFactory(HttpService, `/posts/${post_id}/replies`);
};

export const searchServiceFactory = (filter: string) => {
  if (filter === "posts")
    return httpServiceFactory(HttpService, "/posts/search");
  if (filter !== "users") console.log("invalid filter");
  return httpServiceFactory(HttpService, "/users/search");
};

export const notificationsServiceFactory = (username: string) => {
  return httpServiceFactory(HttpService, `/users/${username}/notifications`);
};

export const genericServiceFactory = (path: string) => {
  return httpServiceFactory(HttpService, path);
};
