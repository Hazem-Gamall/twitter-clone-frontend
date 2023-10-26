import { Divider, VStack } from "@chakra-ui/react";

import { Fragment } from "react";
import IPost from "../../../types/Post";
import { ReplyPost } from "../../Post/ReplyPost";
import { Post } from "../../Post/Post";

interface Props {
  posts: IPost[];
}

export const PostsTab = ({ posts }: Props) => {
  return (
    <VStack align={"stretch"} spacing={0}>
      {posts &&
        posts.map((post) => (
          <Fragment key={post.id}>
            {post.reply_to ? (
              <ReplyPost post={post} />
            ) : (
              <Post variant="none" post={post} />
            )}
            <Divider />
          </Fragment>
        ))}
    </VStack>
  );
};
