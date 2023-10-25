import { HStack } from "@chakra-ui/react";
import IPost from "../../types/Post";
import { LikeButton } from "./InteractionButtons/LikeButton";
import { RepostButton } from "./InteractionButtons/RepostButton";
import { ReplyButton } from "./InteractionButtons/ReplyButton";

interface Props {
  post: IPost;
  setPost: (post: IPost) => void;
}

export const PostInteractionButtonGroup = ({ post, setPost }: Props) => {
  return (
    <HStack width={"100%"} justifyContent={"space-between"} pl={10} pr={3}>
      <ReplyButton setPost={setPost} post={post} count={post.replies_count} />
      <LikeButton setPost={setPost} post={post} count={post.likes_count} />
      <RepostButton setPost={setPost} post={post} count={post.repost_count} />
      <RepostButton setPost={setPost} post={post} count={post.repost_count} />
    </HStack>
  );
};
