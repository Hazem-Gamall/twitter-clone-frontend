import { Avatar, Divider, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import IPost from "../../types/Post";

interface AvatarProps {
  post: IPost;
}

const NormalPostAvatar = ({ post }: AvatarProps) => {
  return (
    <Avatar
      as={Link}
      to={`/${post.post_user.username}`}
      src={`http://localhost:8000${post.post_user.avatar}`}
    />
  );
};

const MainPostAvatar = ({ post }: AvatarProps) => {
  return (
    <VStack height={"100%"}>
      <NormalPostAvatar post={post} />
      <Divider orientation="vertical" borderWidth={2} height={"100%"}></Divider>
    </VStack>
  );
};

const ReplyPostAvatar = ({ post }: AvatarProps) => {
  return (
    <VStack height={"100%"}>
      <Divider orientation="vertical" borderWidth={2} height={"10%"}></Divider>
      <NormalPostAvatar post={post} />
    </VStack>
  );
};

interface Props {
  post: IPost;
  variant: "reply" | "main" | "none";
}

export const PostAvatar = ({ post, variant }: Props) => {
  const avatarVariantMap = {
    reply: <ReplyPostAvatar post={post} />,
    main: <MainPostAvatar post={post} />,
    none: <NormalPostAvatar post={post} />,
  };
  return <>{avatarVariantMap[variant]}</>;
};
