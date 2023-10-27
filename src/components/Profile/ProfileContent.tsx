import {
  HStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Link, useParams, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();

  const filter_param = searchParams.get("filter");
  console.log({ filter_param });

  const filterToTabMap: { [key: string]: number } = {
    with_replies: 1,
  };
  console.log(filter_param ? filterToTabMap[filter_param] : 0);

  const { username } = useParams();
  const { posts, setPosts } = usePosts();
  const { data, isLoading, error } = useData<IPost>(
    userPostsServiceFactory(username as string),
    filter_param ? { with_replies: true } : {},
    [filter_param]
  );

  useEffect(() => {
    if (isLoading) return;
    setPosts && setPosts(data);
  }, [data]);

  return (
    <Tabs
      isManual
      isLazy
      index={filter_param ? filterToTabMap[filter_param] : 0}
    >
      <TabList px={5} justifyContent={"space-between"}>
        <Tab
          flexGrow={1}
          as={Link}
          to={{ pathname: `/${userProfile.user.username}`, search: "" }}
          state={{ tabIndex: 0 }}
        >
          Posts
        </Tab>
        <Tab
          flexGrow={1}
          as={Link}
          to={{
            pathname: `/${userProfile.user.username}`,
            search: "?filter=with_replies",
          }}
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
