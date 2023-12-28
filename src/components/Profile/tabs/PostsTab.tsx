import { Spinner } from "@chakra-ui/react";

import { memo, useEffect } from "react";
import IPost from "../../../types/Post";
import usePosts from "../../../hooks/usePosts";
import { userPostsServiceFactory } from "../../../services/httpServiceFactories";
import { useParams } from "react-router-dom";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { PostList } from "../../Post/PostList";
import { IPostFilters } from "../../../types/PostsFilter";
interface Props {
  type?: IPostFilters;
}

export const PostsTab = memo(({ type = "" }: Props) => {
  let { username } = useParams();
  username = username as string;

  const httpService = userPostsServiceFactory(username);
  const { posts, setPosts } = usePosts();

  const { data, isLoading, error, lastElementRef } = useInfiniteScroll<IPost>(
    httpService,
    { filter: type }
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
