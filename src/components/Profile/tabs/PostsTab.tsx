import { Divider, Spinner, VStack } from "@chakra-ui/react";

import { Fragment, memo, useEffect } from "react";
import IPost from "../../../types/Post";
import { ReplyPost } from "../../Post/ReplyPost";
import { Post } from "../../Post/Post";
import usePosts from "../../../hooks/usePosts";
import { userPostsServiceFactory } from "../../../services/httpServiceFactories";
import { useParams } from "react-router-dom";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
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
    if (setPosts && posts) setPosts(posts?.concat(data));
  }, [data]);

  return (
    <VStack align={"stretch"} spacing={0}>
      {error && <div>error:{error}</div>}
      {posts &&
        posts?.map((post, index) => (
          <Fragment key={post.id}>
            {post.reply_to ? (
              <ReplyPost
                ref={index === posts.length - 1 ? lastElementRef : null}
                post={post}
              />
            ) : (
              <Post
                ref={index === posts.length - 1 ? lastElementRef : null}
                variant="none"
                post={post}
              />
            )}
            <Divider />
          </Fragment>
        ))}
      {isLoading && <Spinner alignSelf={"center"} />}
    </VStack>
  );
});
