import IPost from "../../types/Post";
import { Post } from "./Post";

interface Props {
  post: IPost;
}

export const ReplyPost = ({ post }: Props) => {
  return (
    <>
      <Post variant="main" post={post.reply_to} />
      <Post pt={0} variant="reply" post={post} />
    </>
  );
};
