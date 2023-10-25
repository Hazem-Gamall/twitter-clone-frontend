import { Divider, TabPanel, VStack } from "@chakra-ui/react";
import IPost from "../../../../../types/Post";
import useData from "../../../../../hooks/useList";
import { Post } from "../../../../Post/Post";
import { useParams } from "react-router-dom";
import { Fragment } from "react";
import { userPostsServiceFactory } from "../../../../../services/httpServiceFactories";

export const PostsTab = () => {
  const { username } = useParams();
  const {
    data: posts,
    setData: setPosts,
    isLoading,
    error,
  } = useData<IPost>(userPostsServiceFactory(username as string));

  return (
    <TabPanel p={0}>
      {error && <div>{error}</div>}
      <VStack align={"stretch"} spacing={0}>
        {!isLoading &&
          posts.map((post) => (
            <Fragment key={post.id}>
              <Post
                post={post}
                setPost={(new_post) => {
                  setPosts(
                    posts.map((post) =>
                      post.id !== new_post.id ? post : new_post
                    )
                  );
                }}
              />
              <Divider />
            </Fragment>
          ))}
      </VStack>
    </TabPanel>
  );
};
