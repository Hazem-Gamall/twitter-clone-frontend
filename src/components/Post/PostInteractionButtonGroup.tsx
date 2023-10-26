import { HStack } from "@chakra-ui/react";
import IPost from "../../types/Post";
import { LikeButton } from "./InteractionButtons/LikeButton";
import { RepostButton } from "./InteractionButtons/RepostButton";
import { ReplyButton } from "./InteractionButtons/ReplyButton";
import { ShareButton } from "./InteractionButtons/ShareButton";

interface Props {
  post: IPost;
}

export const PostInteractionButtonGroup = ({ post }: Props) => {
  return (
    <HStack
      position={"relative"}
      left={-3}
      width={"100%"}
      justifyContent={"space-between"}
    >
      <ReplyButton post={post} count={post.replies_count} />
      <LikeButton post={post} count={post.likes_count} />
      <RepostButton post={post} count={post.repost_count} />
      <ShareButton post={post} />
    </HStack>
  );
};
