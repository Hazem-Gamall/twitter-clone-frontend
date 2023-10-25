import { HStack, IconButton, Text } from "@chakra-ui/react";
import { userPostRepostServiceFactory } from "../../../services/httpServiceFactories";
import IPost from "../../../types/Post";
import useAuth from "../../../hooks/useAuth";
import { BiRepost } from "react-icons/bi";
import usePosts from "../../../hooks/usePosts";

interface Props {
  count: number;
  post: IPost;
}

interface PostRepost {
  post: number;
  repost: boolean;
}

export const RepostButton = ({ count, post }: Props) => {
  const { auth } = useAuth();
  const httpService = userPostRepostServiceFactory(auth.username);
  const { posts, setPosts } = usePosts();

  const updatePost = (newPost: IPost) => {
    if (setPosts && posts)
      if (post.reposted_by_user) {
        setPosts(
          posts
            .filter((p) => p.embed?.id !== post.id)
            .map((p) =>
              p.id !== post.id
                ? p
                : {
                    ...post,
                    reposted_by_user: false,
                    repost_count: post.repost_count - 1,
                  }
            )
        );
      } else {
        setPosts([
          newPost,
          ...posts.map((p) =>
            p.id !== post.id
              ? p
              : {
                  ...post,
                  reposted_by_user: true,
                  repost_count: post.repost_count + 1,
                }
          ),
        ]);
      }
  };

  const handleClick = () => {
    const { request } = httpService.create<PostRepost, IPost>({
      post: post.id,
      repost: false,
    });
    request.then((resp) => updatePost(resp.data));
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
