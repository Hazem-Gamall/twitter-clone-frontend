import {
  Avatar,
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import {
  userChatMessagesServiceFactory,
  userChatsServiceFactory,
} from "../services/httpServiceFactories";
import IChat from "../types/Chat";
import IMessage from "../types/Message";
import { useParams } from "react-router-dom";
import useRetrieve from "../hooks/useRetrieve";
import { FormEvent, useEffect, useRef, useState } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { IUserProfile } from "../types/User";

export const Chat = () => {
  const { auth } = useAuth();
  const { chat_id } = useParams();
  const chatHttpService = userChatsServiceFactory(auth?.username as string);
  const { data: chat, isLoading: isChatLoading } = useRetrieve<IChat>(
    chatHttpService,
    chat_id as string
  );

  const wsRef = useRef<WebSocket | null>(null);
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const [otherUserProfile, setOtherUserProfie] = useState<IUserProfile>();

  const messagesHttpService = userChatMessagesServiceFactory(
    auth?.username as string,
    parseInt(chat_id as string)
  );
  const { data, isLoading, setData, lastElementRef } =
    useInfiniteScroll<IMessage>(messagesHttpService, {}, [], 0, 15);

  useEffect(() => {
    if (isChatLoading) return;
    setOtherUserProfie(
      chat.first_user_profile.user.username === auth?.userProfile.user.username
        ? chat.second_user_profile
        : chat.first_user_profile
    );
  }, [chat]);

  useEffect(() => {
    wsRef.current = new WebSocket(
      `ws://localhost:8000/ws/chat/${chat_id}/?token=${auth?.access}`
    );
    wsRef.current.onopen = () => console.log("ws opened");
    wsRef.current.onclose = () => console.log("ws closed");
    wsRef.current.onmessage = (ev) => {
      console.log("on message", ev);

      const message = JSON.parse(ev.data) as IMessage;
      console.log("data before", data);
      setData((stateData) => [message, ...stateData]);
    };
    const currentWs = wsRef.current;

    return () => currentWs.close();
  }, []);

  const sendMessage = (ev: FormEvent) => {
    ev.preventDefault();
    if (!wsRef.current || !messageInputRef.current) return;
    wsRef.current.send(
      JSON.stringify({ message: messageInputRef.current.value })
    );
  };

  console.log("data here", data);
  return (
    <Grid>
      <GridItem>
        <VStack
          height={"90vh"}
          overflowY={"auto"}
          flexDirection={"column-reverse"}
          align={"stretch"}
        >
          <Box>
            <VStack
              align={"stretch"}
              justifyContent={"space-between"}
              spacing={1}
              m={3}
              flexDirection={"column-reverse"}
            >
              {data && (
                <>
                  {isLoading && <Spinner />}
                  {data.map((message, index) => (
                    <Box
                      ref={
                        index === data.length - 1
                          ? (ref) => lastElementRef(ref)
                          : null
                      }
                      borderRadius={30}
                      p={2}
                      alignSelf={
                        message.author.user.username ===
                        auth?.userProfile.user.username
                          ? "flex-end"
                          : "flex-start"
                      }
                      bg={
                        message.author.user.username ===
                        auth?.userProfile.user.username
                          ? "blue"
                          : "gray"
                      }
                      key={message.id}
                    >
                      {message.text}
                    </Box>
                  ))}
                </>
              )}
            </VStack>
          </Box>

          {isChatLoading ? (
            <Spinner />
          ) : (
            <Card>
              <CardBody>
                <HStack justifyContent={"center"}>
                  <VStack>
                    <Avatar />
                    <Text fontWeight={"bold"}>
                      {otherUserProfile?.user.name}
                    </Text>
                    <Text fontWeight={"light"} color={"gray.500"}>
                      @{otherUserProfile?.user.username}
                    </Text>
                    <Text>{otherUserProfile?.bio}</Text>
                    <Text fontWeight={"light"} color={"gray.500"}>
                      Joined {otherUserProfile?.user.date_joined}
                    </Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          )}
        </VStack>
      </GridItem>

      <GridItem verticalAlign={"end"}>
        <form onSubmit={sendMessage}>
          <Input ref={messageInputRef} />
        </form>
      </GridItem>
    </Grid>
  );
};
