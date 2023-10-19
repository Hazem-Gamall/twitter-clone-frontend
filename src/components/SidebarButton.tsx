import { Button, Icon, Link as ChakraLink } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface Props {
  icon: IconType;
  children?: ReactNode;
  to: string;
}

export const SidebarButton = ({ icon, children, to }: Props) => {
  return (
    <Button
      as={Link}
      to={to}
      p={4}
      borderRadius={30}
      size={"lg"}
      fontSize={"xl"}
      variant={"ghost"}
      fontWeight={"light"}
      leftIcon={<Icon as={icon} fontSize={"24px"} />}
    >
      {children}
    </Button>
  );
};
