import {
  Avatar,
  Card,
  CardBody,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";
import {
  userChatMessagesServiceFactory,
  userChatsServiceFactory,
} from "../services/httpServiceFactories";
import IChat from "../types/Chat";
import IMessage from "../types/Message";
import { useParams } from "react-router-dom";
import useRetrieve from "../hooks/useRetrieve";

export const Chat = () => {
  const { auth } = useAuth();
  const { chat_id } = useParams();
  const chatHttpService = userChatsServiceFactory(auth?.username as string);
  const { data: chat, isLoading: isChatLoading } = useRetrieve<IChat>(
    chatHttpService,
    chat_id as string
  );
  console.log("chat_id", chat_id);

  const messagesHttpService = userChatMessagesServiceFactory(
    auth?.username as string,
    parseInt(chat_id as string)
  );
  const { data, isLoading } = useList<IMessage>(messagesHttpService);

  console.log("chat", chat);

  return (
    <>
      {isChatLoading ? (
        <Spinner />
      ) : (
        <Card>
          <CardBody>
            <HStack justifyContent={"center"}>
              <VStack>
                <Avatar />
                <Text fontWeight={"bold"}>
                  {chat.first_user_profile.user.name}
                </Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        data.map((message) => <div key={message.id}>{message.text}</div>)
      )}

      <form>
        <Input />
      </form>
    </>
  );
};
