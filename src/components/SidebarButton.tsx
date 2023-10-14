import { Button, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  children?: ReactNode;
}

export const SidebarButton = ({ icon, children }: Props) => {
  return (
    <Button
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
