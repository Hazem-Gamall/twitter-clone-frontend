import { HStack } from "@chakra-ui/react";
import { PostInteractionButton } from "./InteractionButtons/PostInteractionButton";
import IPost from "../../types/Post";
import { LikeButton } from "./InteractionButtons/LikeButton";
import { RepostButton } from "./InteractionButtons/RepostButton";

interface Props {
  post: IPost;
  setPost: (post: IPost) => void;
}

export const PostInteractionButtonGroup = ({ post, setPost }: Props) => {
  return (
    <HStack width={"100%"} justifyContent={"space-between"} pl={10} pr={3}>
      <PostInteractionButton
        setPost={setPost}
        post={post}
        type="reply"
        count={post.replies_count}
      />
      <LikeButton setPost={setPost} post={post} count={post.likes_count} />
      <RepostButton setPost={setPost} post={post} count={post.repost_count} />
      <PostInteractionButton
        setPost={setPost}
        post={post}
        type="share"
        count={post.replies_count}
      />
    </HStack>
  );
};
