import { VStack } from "@chakra-ui/react";
import { ChatList } from "./ChatList";
import { useNavigate } from "react-router-dom";

export const ChatListContainer = () => {
  const navigate = useNavigate();
  return (
    <VStack
      overflowY={"scroll"}
      alignItems={"flex-start"}
      align={"stretch"}
      height={"98vh"}
    >
      <ChatList onClick={(chat_id) => navigate(`/messages/${chat_id}`)} />
    </VStack>
  );
};
