import { IUserProfile } from "../types/User";
import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import { Link, Route, Routes } from "react-router-dom";
import { PostsTab } from "./profileContent/tabs/PostsTab";

interface Props {
  userProfile: IUserProfile;
}

export const ProfileContent = ({ userProfile }: Props) => {
  return (
    <Tabs>
      <TabList
        as={Link}
        to={`/${userProfile.user.username}`}
        px={5}
        justifyContent={"space-between"}
      >
        <Tab flexGrow={1} as={Link} to={`/${userProfile.user.username}`}>
          Posts
        </Tab>
        <Tab
          flexGrow={1}
          as={Link}
          to={`/${userProfile.user.username}/with_replies`}
        >
          Replies
        </Tab>
        <Tab flexGrow={1} as={Link} to={`/${userProfile.user.username}/media`}>
          Media
        </Tab>
        <Tab flexGrow={1} as={Link} to={`/${userProfile.user.username}/likes`}>
          Likes
        </Tab>
      </TabList>
      <TabPanels>
        <Routes>
          <Route path="/">
            <Route index element={<PostsTab />} />
            <Route path="with_replies" />
          </Route>
        </Routes>
      </TabPanels>
    </Tabs>
  );
};
