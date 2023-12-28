import { VStack } from "@chakra-ui/react";
import { Chat } from "./Chat";

export const ChatContainer = () => {
  return (
    <VStack
      width={"100%"}
      align={"stretch"}
      height={"98vh"}
      overflow={"auto"}
      flexDirection={"column-reverse"}
    >
      <Chat />
    </VStack>
  );
};
