import { Divider, TabPanel, VStack } from "@chakra-ui/react";
import IPost from "../../../../../types/Post";
import useData from "../../../../../hooks/useList";
import { Post } from "../../../../Post/Post";
import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { userPostsServiceFactory } from "../../../../../services/httpServiceFactories";
import usePosts from "../../../../../hooks/usePosts";

export const PostsTab = () => {
  const { username } = useParams();
  const { posts, setPosts } = usePosts();
  const { data, isLoading, error } = useData<IPost>(
    userPostsServiceFactory(username as string)
  );

  useEffect(() => {
    if (isLoading) return;
    setPosts && setPosts(data);
  }, [data]);

  return (
    <TabPanel p={0}>
      {error && <div>{error}</div>}
      <VStack align={"stretch"} spacing={0}>
        {posts &&
          posts.map((post) => (
            <Fragment key={post.id}>
              <Post post={post} />
              <Divider />
            </Fragment>
          ))}
      </VStack>
    </TabPanel>
  );
};
