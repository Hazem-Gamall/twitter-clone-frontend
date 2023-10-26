import { Divider, VStack } from "@chakra-ui/react";
import IPost from "../../../../../types/Post";
import { Post } from "../../../../Post/Post";
import { Fragment } from "react";
import { ReplyPost } from "../../../../Post/ReplyPost";

interface Props {
  posts: IPost[];
}

export const PostsTab = ({ posts }: Props) => {
  return (
    <VStack align={"stretch"} spacing={0}>
      {posts && (
        <>
          {console.log(posts)}

          {posts.map((post) => (
            <Fragment key={post.id}>
              {post.reply_to ? <ReplyPost post={post} /> : <Post post={post} />}
              <Divider />
            </Fragment>
          ))}
        </>
      )}
    </VStack>
  );
};
