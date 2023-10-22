import { useEffect, useState } from "react";
import { IUserProfile } from "../types/User";
import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import useApiClient from "../../../hooks/useApiClient";
import { Link } from "react-router-dom";
import { PostsTab } from "./profileContent/tabs/PostsTab";

interface Props {
  userProfile: IUserProfile;
}

export const ProfileContent = ({ userProfile }: Props) => {
  const [currentTab, setCurrentTab] = useState(0);
  const apiClient = useApiClient();
  useEffect(() => {
    apiClient.get("/posts");
  }, [currentTab]);
  return (
    <Tabs>
      <TabList
        as={Link}
        to={`/${userProfile.user.username}`}
        px={5}
        justifyContent={"space-between"}
      >
        <Tab>Posts</Tab>
        <Tab>Replies</Tab>
        <Tab>Media</Tab>
        <Tab>Likes</Tab>
      </TabList>
      <TabPanels>
        <PostsTab></PostsTab>
      </TabPanels>
    </Tabs>
  );
};
