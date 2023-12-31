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
import useAuth from "../../hooks/useAuth";
import {
  userChatMessagesServiceFactory,
  userChatsServiceFactory,
} from "../../services/httpServiceFactories";
import IChat from "../../types/Chat";
import IMessage from "../../types/Message";
import { Link, useParams } from "react-router-dom";
import useRetrieve from "../../hooks/useRetrieve";
import { FormEvent, useEffect, useRef, useState } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { IUserProfile } from "../../types/User";
import useRefreshToken from "../../hooks/useRefreshToken";
import { ChatMessage } from "./ChatMessage";

export const WS_URL = import.meta.env.VITE_WS_URL;

interface Props {
  chatId?: number;
  numberOfMessages?: number;
}

export const Chat = ({ chatId, numberOfMessages = 15 }: Props) => {
  const { auth } = useAuth();
  let { chat_id } = useParams();
  if (chatId) chat_id = chatId.toString();
  const chatHttpService = userChatsServiceFactory(auth?.username as string);
  const { data: chat, isLoading: isChatLoading } = useRetrieve<IChat>(
    chatHttpService,
    chat_id as string,
    [chat_id]
  );

  const wsRef = useRef<WebSocket | null>(null);
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const [otherUserProfile, setOtherUserProfie] = useState<IUserProfile>();

  const messagesHttpService = userChatMessagesServiceFactory(
    auth?.username as string,
    parseInt(chat_id as string)
  );
  const { data, isLoading, setData, lastElementRef } =
    useInfiniteScroll<IMessage>(
      messagesHttpService,
      {},
      [chat_id],
      0,
      numberOfMessages
    );

  useEffect(() => {
    if (isChatLoading) return;
    setOtherUserProfie(
      chat.first_user_profile.user.username === auth?.userProfile.user.username
        ? chat.second_user_profile
        : chat.first_user_profile
    );
  }, [chat]);
  const refreshToken = useRefreshToken();

  useEffect(() => {
    wsRef.current = new WebSocket(
      `${WS_URL}/chat/${chat_id}/?token=${auth?.access}`
    );
    wsRef.current.onopen = () => console.log("ws opened");
    wsRef.current.onerror = (ev) => console.log("ws error", ev);
    wsRef.current.onclose = (ev) => {
      console.log("ws closed", ev);
      if (ev.code === 1006) {
      }
    };
    wsRef.current.onmessage = (ev) => {
      console.log("on message", ev);

      const message = JSON.parse(ev.data) as IMessage;
      console.log("data before", data);
      setData((stateData) => [message, ...stateData]);
    };
    const currentWs = wsRef.current;

    const interval = setInterval(() => refreshToken(), 1000 * 60);

    return () => {
      clearInterval(interval);
      currentWs.close();
    };
  }, [chat_id]);

  const sendMessage = (ev: FormEvent) => {
    ev.preventDefault();
    if (!wsRef.current || !messageInputRef.current) return;
    if (messageInputRef.current.value.length === 0) return;
    wsRef.current.send(
      JSON.stringify({ message: messageInputRef.current.value })
    );
    messageInputRef.current.value = "";
  };

  console.log("data here", data);
  return (
    <Grid>
      <HStack bg="black" position={"sticky"} top={0} p={3} zIndex={1}>
        <Avatar
          as={Link}
          to={`/${otherUserProfile?.user.username}`}
          src={`/${otherUserProfile?.avatar}`}
        />
        <Text>{otherUserProfile?.user.name}</Text>
      </HStack>
      <GridItem>
        <VStack
          maxH={"100%"}
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
                  {data.map((message, index) => (
                    <ChatMessage
                      setMessage={(message) =>
                        setData((messages) =>
                          messages.map((m) =>
                            m.id === message.id ? { ...m, seen: true } : m
                          )
                        )
                      }
                      message={message}
                      ref={index === data.length - 1 ? lastElementRef : null}
                    />
                  ))}
                  {isLoading && <Spinner />}
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
