import { HStack, IconButton, Text } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { userPostLikeServiceFactory } from "../../../services/httpServiceFactories";
import IPost from "../../../types/Post";
import useAuth from "../../../hooks/useAuth";
import usePosts from "../../../hooks/usePosts";

interface Props {
  count: number;
  post: IPost;
}

interface PostLike {
  post: number;
  like: boolean;
}

export const LikeButton = ({ count, post }: Props) => {
  const { auth } = useAuth();
  const httpService = userPostLikeServiceFactory(auth?.username as string);
  const { posts, setPosts } = usePosts();

  const updatePost = (newPost: IPost) => {
    if (setPosts && posts) {
      setPosts(
        posts
          .map((p) => (p.id !== post.id ? p : newPost))
          .map((p) => (p.embed?.id !== post.id ? p : { ...p, embed: newPost }))
      );
    }
  };

  const handleClick = () => {
    if (post.liked_by_user) {
      const { request } = httpService.create<PostLike, IPost>({
        post: post.id,
        like: false,
      });
      request.then((resp) => {
        updatePost(resp.data);
      });
    } else {
      const { request } = httpService.create<PostLike, IPost>({
        post: post.id,
        like: true,
      });
      request.then((resp) => {
        updatePost(resp.data);
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
