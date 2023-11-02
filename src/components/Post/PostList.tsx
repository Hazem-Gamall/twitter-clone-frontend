import { Fragment } from "react";
import IPost from "../../types/Post";
import { Divider, VStack } from "@chakra-ui/react";
import { ReplyPost } from "./ReplyPost";
import { Post } from "./Post";

interface Props {
  posts: IPost[];
  lastElementRef: any;
}

export const PostList = ({ posts, lastElementRef }: Props) => {
  return (
    <VStack align={"stretch"} spacing={0}>
      {posts.map((post, index) => (
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
    </VStack>
  );
};
