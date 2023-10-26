import {
  HStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Link, useLocation, useParams } from "react-router-dom";
import { IUserProfile } from "../../types/User";
import usePosts from "../../hooks/usePosts";
import useData from "../../hooks/useList";
import { userPostsServiceFactory } from "../../services/httpServiceFactories";
import IPost from "../../types/Post";
import { useEffect } from "react";
import { PostsTab } from "./tabs/PostsTab";

interface Props {
  userProfile: IUserProfile;
}

export const ProfileContent = ({ userProfile }: Props) => {
  const location = useLocation();

  const with_replies = location.state?.route;
  console.log("with replies", with_replies);
  console.log("location state route", location.state?.route);

  const { username } = useParams();
  const { posts, setPosts } = usePosts();
  const { data, isLoading, error } = useData<IPost>(
    userPostsServiceFactory(username as string),
    with_replies ? { with_replies: true } : {},
    [with_replies]
  );

  useEffect(() => {
    if (isLoading) return;
    setPosts && setPosts(data);
    console.log("set posts");
  }, [data]);

  console.log("loading", isLoading);

  console.log("posts", posts);
  console.log("data", data);

  return (
    <Tabs isManual isLazy>
      <TabList px={5} justifyContent={"space-between"}>
        <Tab
          flexGrow={1}
          as={Link}
          to={`/${userProfile.user.username}`}
          state={{ tabIndex: 0 }}
        >
          Posts
        </Tab>
        <Tab
          flexGrow={1}
          as={Link}
          to={`/${userProfile.user.username}/with_replies`}
          state={{ route: "with_replies" }}
        >
          Replies
        </Tab>
        <Tab
          flexGrow={1}
          as={Link}
          to={`/${userProfile.user.username}/media`}
          state={{ tabIndex: 2 }}
        >
          Media
        </Tab>
        <Tab
          flexGrow={1}
          as={Link}
          to={`/${userProfile.user.username}/likes`}
          state={{ tabIndex: 3 }}
        >
          Likes
        </Tab>
      </TabList>
      {error && <div>error: {error}</div>}
      {isLoading ? (
        <HStack height={"70vh"} justifyContent={"center"}>
          <Spinner color="twitter.100" />
        </HStack>
      ) : (
        <TabPanels>
          <TabPanel height={"70vh"} p={0}>
            {posts && <PostsTab posts={posts} />}
          </TabPanel>
          <TabPanel height={"70vh"} p={0}>
            {posts && <PostsTab posts={posts} />}
          </TabPanel>
          <TabPanel height={"70vh"}></TabPanel>
        </TabPanels>
      )}
    </Tabs>
  );
};
