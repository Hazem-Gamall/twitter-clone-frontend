import { Button, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface Props {
  icon: IconType;
  children?: ReactNode;
  to: string;
  onClick?: () => void;
}

export const SidebarButton = ({ icon, children, to, onClick }: Props) => {
  return (
    <Button
      as={NavLink}
      to={to}
      onClick={onClick}
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
