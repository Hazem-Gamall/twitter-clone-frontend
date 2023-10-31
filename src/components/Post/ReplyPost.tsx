import { forwardRef } from "@chakra-ui/react";
import IPost from "../../types/Post";
import { Post } from "./Post";

interface Props {
  post: IPost;
}

export const ReplyPost = forwardRef(({ post }: Props, ref) => {
  return (
    <>
      <Post ref={ref} variant="main" post={post.reply_to} />
      <Post pt={0} variant="reply" post={post} />
    </>
  );
});
