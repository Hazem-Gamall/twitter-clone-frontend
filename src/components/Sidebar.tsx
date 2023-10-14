import { Button, IconButton, List, ListItem } from "@chakra-ui/react";
import { FaXTwitter } from "react-icons/fa6";
import { CgHome } from "react-icons/cg";
import { BsSearch, BsPeople, BsPerson } from "react-icons/bs";
import { RiNotification2Line, RiFileListLine } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { SidebarButton } from "./SidebarButton";

export const Sidebar = () => {
  return (
    <List px={3}>
      <ListItem>
        <IconButton
          variant={"ghost"}
          borderRadius={20}
          fontSize={"30px"}
          aria-label="twitter"
          ml={4}
          icon={<FaXTwitter />}
        />
      </ListItem>
      <ListItem>
        <SidebarButton icon={CgHome}>Home</SidebarButton>
      </ListItem>

      <ListItem>
        <SidebarButton icon={BsSearch}>Explore</SidebarButton>
      </ListItem>

      <ListItem>
        <SidebarButton icon={RiNotification2Line}>Notifications</SidebarButton>
      </ListItem>

      <ListItem>
        <SidebarButton icon={FiMail}>Messages</SidebarButton>
      </ListItem>

      <ListItem>
        <SidebarButton icon={RiFileListLine}>Lists</SidebarButton>
      </ListItem>

      <ListItem>
        <SidebarButton icon={BsPeople}>Communities</SidebarButton>
      </ListItem>

      <ListItem>
        <SidebarButton icon={BsPerson}>Profile</SidebarButton>
      </ListItem>
      <ListItem>
        <Button width={"100%"} borderRadius={30} colorScheme={"twitter"}>
          Post
        </Button>
      </ListItem>
    </List>
  );
};
