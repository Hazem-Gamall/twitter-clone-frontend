import { Divider, TabPanel, VStack } from "@chakra-ui/react";
import IPost from "../../../../../types/Post";
import useData from "../../../../../hooks/useData";
import { Post } from "../../../../Post";
import { useParams } from "react-router-dom";

export const PostsTab = () => {
  const { username } = useParams();
  const {
    data: posts,
    isLoading,
    error,
  } = useData<IPost[]>(`/users/${username}/posts/`);
  console.log("loading", isLoading);
  console.log("posts", posts);

  return (
    <TabPanel p={0}>
      {error && <div>{error}</div>}
      <VStack align={"stretch"}>
        {!isLoading &&
          posts.map((post) => (
            <>
              <Post key={post.id} post={post} />
              <Divider></Divider>
            </>
          ))}
      </VStack>
    </TabPanel>
  );
};
