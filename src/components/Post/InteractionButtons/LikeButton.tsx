import { HStack, IconButton, Text } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { userPostLikeServiceFactory } from "../../../services/httpServiceFactories";
import IPost from "../../../types/Post";
import useAuth from "../../../hooks/useAuth";

interface Props {
  count: number;
  post: IPost;
  setPost: (post: IPost) => void;
}

export const LikeButton = ({ count, post, setPost }: Props) => {
  const { auth } = useAuth();
  const httpService = userPostLikeServiceFactory(auth.username);

  const handleClick = () => {
    if (post.liked_by_user) {
      const { request } = httpService.create({ post: post.id, like: false });
      request.then((resp) => setPost(resp.data as any));
    } else {
      const { request } = httpService.create({ post: post.id, like: true });
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
        icon={
          post.liked_by_user ? <AiFillHeart color="red" /> : <AiOutlineHeart />
        }
        onClick={handleClick}
      />
      <Text fontSize={"sm"}>{count}</Text>
    </HStack>
  );
};
