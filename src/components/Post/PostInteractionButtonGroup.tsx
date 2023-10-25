import { HStack } from "@chakra-ui/react";
import IPost from "../../types/Post";
import { LikeButton } from "./InteractionButtons/LikeButton";
import { RepostButton } from "./InteractionButtons/RepostButton";
import { ReplyButton } from "./InteractionButtons/ReplyButton";

interface Props {
  post: IPost;
}

export const PostInteractionButtonGroup = ({ post }: Props) => {
  return (
    <HStack width={"100%"} justifyContent={"space-between"} pl={10} pr={3}>
      <ReplyButton post={post} count={post.replies_count} />
      <LikeButton post={post} count={post.likes_count} />
      <RepostButton post={post} count={post.repost_count} />
      <RepostButton post={post} count={post.repost_count} />
    </HStack>
  );
};
