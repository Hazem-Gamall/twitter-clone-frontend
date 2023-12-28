import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Link, useLocation, useParams } from "react-router-dom";
import { IUserProfile } from "../../types/User";
import { PostsTab } from "./tabs/PostsTab";
import { PostsProvider } from "../../context/PostsProvider";

interface Props {
  userProfile: IUserProfile;
}

export const ProfileContent = ({ userProfile }: Props) => {
  let { username } = useParams();
  username = username as string;
  const location = useLocation();
  const type = location.pathname.split("/")[2] || "";

  const postFiltersIndex: { [key: string]: number } = {
    "": 0,
    with_replies: 1,
    media: 2,
    likes: 3,
  };
  const tabIndex = postFiltersIndex[type];

  return (
    <Tabs isFitted isLazy index={tabIndex}>
      <TabList px={5}>
        <Tab as={Link} to={{ pathname: `/${userProfile.user.username}` }}>
          Posts
        </Tab>
        <Tab
          as={Link}
          to={{
            pathname: `/${userProfile.user.username}/with_replies`,
          }}
        >
          Replies
        </Tab>
        <Tab as={Link} to={`/${userProfile.user.username}/media`}>
          Media
        </Tab>
        <Tab as={Link} to={`/${userProfile.user.username}/likes`}>
          Likes
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel height={"70vh"} p={0}>
          <PostsProvider>
            <PostsTab />
          </PostsProvider>
        </TabPanel>

        <TabPanel height={"70vh"} p={0}>
          <PostsProvider>
            <PostsTab type="with_replies" />
          </PostsProvider>
        </TabPanel>

        <TabPanel height={"70vh"} p={0}>
          <PostsProvider>
            <PostsTab type="media_only" />
          </PostsProvider>
        </TabPanel>

        <TabPanel height={"70vh"} p={0}>
          <PostsProvider>
            <PostsTab type="likes_only" />
          </PostsProvider>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
