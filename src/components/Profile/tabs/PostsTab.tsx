import { Spinner } from "@chakra-ui/react";

import { memo, useEffect } from "react";
import IPost from "../../../types/Post";
import usePosts from "../../../hooks/usePosts";
import { userPostsServiceFactory } from "../../../services/httpServiceFactories";
import { useParams } from "react-router-dom";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { PostList } from "../../Post/PostList";
interface Props {
  type: "main" | "with_replies";
}

export const PostsTab = memo(({ type = "main" }: Props) => {
  let { username } = useParams();
  username = username as string;

  const httpService = userPostsServiceFactory(username);
  const { posts, setPosts } = usePosts();

  const { data, isLoading, error, lastElementRef } = useInfiniteScroll<IPost>(
    httpService,
    {
      ...(type === "with_replies" && { with_replies: true }),
    }
  );

  useEffect(() => {
    if (isLoading) return;
    if (setPosts && posts) setPosts(data);
  }, [data]);

  return (
    <>
      {error && <div>error:{error}</div>}
      {posts ? (
        <PostList posts={posts} lastElementRef={lastElementRef} />
      ) : (
        <Spinner alignSelf={"center"} />
      )}
    </>
  );
});
