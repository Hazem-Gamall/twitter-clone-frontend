import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { IUserProfile } from "../../types/User";
import { PostsTab } from "./tabs/PostsTab";
import { PostsProvider } from "../../context/PostsProvider";

interface Props {
  userProfile: IUserProfile;
  type: "main" | "with_replies";
}

export const ProfileContent = ({ userProfile, type }: Props) => {
  let { username } = useParams();
  username = username as string;
  const tabIndex = type === "main" ? 0 : 1;
  console.log("hello", type);
  console.log("tab index", tabIndex);

  return (
    <Tabs isFitted isLazy lazyBehavior="keepMounted" index={tabIndex}>
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
            <PostsTab type="main" />
          </PostsProvider>
        </TabPanel>
        <TabPanel height={"70vh"} p={0}>
          <PostsProvider>
            <PostsTab type="with_replies" />
          </PostsProvider>
        </TabPanel>
        <TabPanel height={"70vh"}></TabPanel>
      </TabPanels>
    </Tabs>
  );
};
