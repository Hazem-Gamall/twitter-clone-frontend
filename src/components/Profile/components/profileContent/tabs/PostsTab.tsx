import { TabPanel, VStack } from "@chakra-ui/react";
import useAuth from "../../../../../hooks/useAuth";
import IPost from "../../../types/Post";
import useData from "../../../../../hooks/useData";
import { Post } from "../../../../Post";

export const PostsTab = () => {
  const { auth } = useAuth();
  const {
    data: posts,
    isLoading,
    error,
  } = useData<IPost[]>(`/users/${auth.username}/posts/`);
  console.log("loading", isLoading);
  console.log("posts", posts);

  return (
    <TabPanel p={0}>
      {error && <div>{error}</div>}
      <VStack align={"stretch"}>
        {!isLoading && posts.map((post) => <Post key={post.id} post={post} />)}
      </VStack>
    </TabPanel>
  );
};
