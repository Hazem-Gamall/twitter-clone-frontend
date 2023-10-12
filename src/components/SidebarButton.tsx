import { Button } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";
import { IconType } from "react-icons";

interface Props {
  icon: ReactElement<IconType>;
  children?: ReactNode;
}

export const SidebarButton = ({ icon, children }: Props) => {
  return (
    <Button
      borderRadius={20}
      fontSize={"xl"}
      bg={"black"}
      fontWeight={"light"}
      leftIcon={icon}
    >
      {children}
    </Button>
  );
};
