import { Divider, Spinner, VStack } from "@chakra-ui/react";

import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import IPost from "../../../types/Post";
import { ReplyPost } from "../../Post/ReplyPost";
import { Post } from "../../Post/Post";
import usePosts from "../../../hooks/usePosts";
import useList from "../../../hooks/useList";
import { userPostsServiceFactory } from "../../../services/httpServiceFactories";
import { useParams } from "react-router-dom";
interface Props {
  type: "main" | "with_replies";
}

export const PostsTab = memo(({ type = "main" }: Props) => {
  let { username } = useParams();
  username = username as string;

  const httpService = userPostsServiceFactory(username);
  const { posts, setPosts } = usePosts();
  const LIMIT = 5;
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, error } = useList<IPost>(
    httpService,
    {
      ...(type === "with_replies" && { with_replies: true }),
      limit: LIMIT,
      offset,
    },
    [offset]
  );

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset(offset + LIMIT);
          console.log("visible");
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    if (isLoading) return;
    console.log("setting posts to data");
    console.log("data length", data.length);

    setHasMore(data.length !== 0);
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
                ref={index === posts.length - 1 ? lastPostRef : null}
                post={post}
              />
            ) : (
              <Post
                ref={index === posts.length - 1 ? lastPostRef : null}
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
