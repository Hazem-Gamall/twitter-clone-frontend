import { HStack, IconButton, Text } from "@chakra-ui/react";
import { userPostRepostServiceFactory } from "../../../services/httpServiceFactories";
import IPost from "../../../types/Post";
import useAuth from "../../../hooks/useAuth";
import { BiRepost } from "react-icons/bi";

interface Props {
  count: number;
  post: IPost;
  setPost: (post: IPost) => void;
}

export const RepostButton = ({ count, post, setPost }: Props) => {
  const { auth } = useAuth();
  const httpService = userPostRepostServiceFactory(auth.username);

  const handleClick = () => {
    if (post.repost) {
      const { request } = httpService.create({ post: post.id, repost: false });
      request.then((resp) => setPost(resp.data as any));
    } else {
      const { request } = httpService.create({ post: post.id, repost: true });
      request.then((resp) => {
        setPost(resp.data as any);
      });
    }
  };

  return (
    <HStack spacing={0}>
      <IconButton
        variant={"ghost"}
        borderRadius={30}
        aria-label="post interaction button"
        icon={post.reposted_by_user ? <BiRepost color="green" /> : <BiRepost />}
        onClick={handleClick}
      />
      <Text fontSize={"sm"}>{count}</Text>
    </HStack>
  );
};
