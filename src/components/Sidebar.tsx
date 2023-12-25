import { Badge, Button, IconButton, VStack } from "@chakra-ui/react";
import { FaXTwitter } from "react-icons/fa6";
import { CgHome } from "react-icons/cg";
import { BsSearch, BsPeople, BsPerson } from "react-icons/bs";
import { RiNotification2Line, RiFileListLine } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { SidebarButton } from "./SidebarButton";
import { Link } from "react-router-dom";
import getObjectFromJWT from "../utils/getObjectFromJwt";
import useAuth from "../hooks/useAuth";

interface Props {
  hasNotification?: boolean;
}

export const Sidebar = ({ hasNotification = false }: Props) => {
  const { auth, setAuth } = useAuth();
  return (
    <VStack position={"fixed"} px={3} align={"start"}>
      <IconButton
        as={Link}
        to="/home"
        variant={"ghost"}
        borderRadius={20}
        fontSize={"30px"}
        aria-label="twitter"
        ml={4}
        icon={<FaXTwitter />}
      />

      <SidebarButton to="/home" icon={CgHome}>
        Home
      </SidebarButton>

      <SidebarButton to="/explore" icon={BsSearch}>
        Explore
      </SidebarButton>

      <SidebarButton to="/notifications" icon={RiNotification2Line}>
        Notifications
        {hasNotification && (
          <Badge ml={2} boxSize={2} borderRadius={35} bg="red">
            &#8203;
          </Badge>
        )}
      </SidebarButton>

      <SidebarButton to="/messages" icon={FiMail}>
        Messages
      </SidebarButton>

      <SidebarButton to="/lists" icon={RiFileListLine}>
        Lists
      </SidebarButton>

      <SidebarButton to="/communities" icon={BsPeople}>
        Communities
      </SidebarButton>

      <SidebarButton
        to={`/${getObjectFromJWT(auth?.access)?.username}`}
        icon={BsPerson}
      >
        Profile
      </SidebarButton>

      <Button width={"100%"} borderRadius={30} colorScheme={"twitter"}>
        Post
      </Button>

      <Button
        onClick={() => setAuth && setAuth(undefined)}
        width={"100%"}
        borderRadius={30}
        colorScheme={"twitter"}
      >
        SignOut
      </Button>
    </VStack>
  );
};
