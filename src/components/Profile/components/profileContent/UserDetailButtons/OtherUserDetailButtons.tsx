import { Button, IconButton } from "@chakra-ui/react";
import { FiMail, FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineNotificationAdd } from "react-icons/md";

export const OtherUserDetailButtons = () => {
  return (
    <>
      <IconButton
        aria-label="more"
        icon={<FiMoreHorizontal />}
        borderRadius={30}
        fontSize={"xl"}
        variant={"outline"}
      />

      <IconButton
        aria-label="messages"
        icon={<FiMail />}
        borderRadius={30}
        fontSize={"xl"}
        variant={"outline"}
      />

      <IconButton
        aria-label="more"
        icon={<MdOutlineNotificationAdd />}
        borderRadius={30}
        fontSize={"xl"}
        variant={"outline"}
      />
      <Button variant={"outline"} borderRadius={30}>
        Following
      </Button>
    </>
  );
};
