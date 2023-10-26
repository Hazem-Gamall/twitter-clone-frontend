import { HStack, IconButton } from "@chakra-ui/react";
import { FiShare } from "react-icons/fi";
import IPost from "../../../types/Post";

export const ShareButton = ({ post }: { post: IPost }) => {
  return (
    <HStack spacing={0}>
      <IconButton
        variant={"ghost"}
        borderRadius={30}
        aria-label="post interaction button"
        icon={<FiShare />}
        onClick={() => {
          navigator.clipboard.writeText(
            `${window.location.origin}/${post.post_user.username}/status/${post.id}`
          );
        }}
      />
    </HStack>
  );
};
