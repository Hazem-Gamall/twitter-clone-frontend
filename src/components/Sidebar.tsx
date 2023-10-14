import { Button, IconButton, List, ListItem, VStack } from "@chakra-ui/react";
import { FaXTwitter } from "react-icons/fa6";
import { CgHome } from "react-icons/cg";
import { BsSearch, BsPeople, BsPerson } from "react-icons/bs";
import { RiNotification2Line, RiFileListLine } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { SidebarButton } from "./SidebarButton";

export const Sidebar = () => {
  return (
    <VStack px={3} align={"start"}>
      <IconButton
        variant={"ghost"}
        borderRadius={20}
        fontSize={"30px"}
        aria-label="twitter"
        ml={4}
        icon={<FaXTwitter />}
      />

      <SidebarButton icon={CgHome}>Home</SidebarButton>

      <SidebarButton icon={BsSearch}>Explore</SidebarButton>

      <SidebarButton icon={RiNotification2Line}>Notifications</SidebarButton>

      <SidebarButton icon={FiMail}>Messages</SidebarButton>

      <SidebarButton icon={RiFileListLine}>Lists</SidebarButton>

      <SidebarButton icon={BsPeople}>Communities</SidebarButton>

      <SidebarButton icon={BsPerson}>Profile</SidebarButton>

      <Button width={"100%"} borderRadius={30} colorScheme={"twitter"}>
        Post
      </Button>
    </VStack>
  );
};
