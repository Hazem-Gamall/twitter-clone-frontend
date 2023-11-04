import { Spinner, VStack } from "@chakra-ui/react";
import { NewPost } from "./Post/NewPost";
import useAuth from "../hooks/useAuth";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { userTimelineServiceFactory } from "../services/httpServiceFactories";
import { PostList } from "./Post/PostList";
import IPost from "../types/Post";
import { useEffect } from "react";
import usePosts from "../hooks/usePosts";

export const HomeContent = () => {
  const { auth } = useAuth();
  const httpService = userTimelineServiceFactory(auth?.username as string);
  const { posts, setPosts } = usePosts();
  const { data, error, isLoading, lastElementRef } =
    useInfiniteScroll<IPost>(httpService);
  if (error) return <div>Error:{error}</div>;
  useEffect(() => {
    if (isLoading) return;
    if (setPosts && posts) setPosts(data);
  }, [data]);
  console.log("posts", posts);

  return (
    <VStack align={"stretch"}>
      <NewPost />

      {posts && <PostList posts={posts} lastElementRef={lastElementRef} />}
      {isLoading && <Spinner alignSelf={"center"} />}
    </VStack>
  );
};
