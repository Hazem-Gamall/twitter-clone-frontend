import { Divider, Spinner, VStack } from "@chakra-ui/react";

import { Fragment, memo, useEffect, useState } from "react";
import IPost from "../../../types/Post";
import { ReplyPost } from "../../Post/ReplyPost";
import { Post } from "../../Post/Post";
import usePosts from "../../../hooks/usePosts";
import useData from "../../../hooks/useList";
import { userPostsServiceFactory } from "../../../services/httpServiceFactories";
import { useParams } from "react-router-dom";
interface Props {
  type: "main" | "with_replies";
}

export const PostsTab = memo(({ type = "main" }: Props) => {
  const { username } = useParams();

  const httpService = userPostsServiceFactory(username as string);
  const { posts, setPosts } = usePosts();
  const LIMIT = 5;
  const [offset, setOffset] = useState(0);

  const { data, isLoading, error } = useData<IPost>(
    httpService,
    {
      ...(type === "with_replies" && { with_replies: true }),
      limit: LIMIT,
      offset,
    },
    [username]
  );

  useEffect(() => {
    if (isLoading) return;
    console.log("setting posts to data");

    if (setPosts && posts) setPosts(posts?.concat(data));
    setOffset(offset + LIMIT);
  }, [data]);

  return (
    <VStack align={"stretch"} spacing={0}>
      {error && <div>error:{error}</div>}
      {isLoading ? (
        <Spinner alignSelf={"center"} m={5} />
      ) : (
        posts?.map((post) => (
          <Fragment key={post.id}>
            {post.reply_to ? (
              <ReplyPost post={post} />
            ) : (
              <Post variant="none" post={post} />
            )}
            <Divider />
          </Fragment>
        ))
      )}
    </VStack>
  );
});
