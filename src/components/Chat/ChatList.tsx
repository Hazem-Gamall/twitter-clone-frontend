import {
  Avatar,
  Card,
  CardBody,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import IChat from "../../types/Chat";
import { userChatsServiceFactory } from "../../services/httpServiceFactories";
import useAuth from "../../hooks/useAuth";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { NavLink, useParams } from "react-router-dom";
import { ChatComposeModal } from "./ChatComposeModal";

export const ChatList = () => {
  const { auth } = useAuth();
  console.log("username", auth?.username);
  const { chat_id } = useParams();
  const httpService = userChatsServiceFactory(auth?.username as string);

  const { data, isLoading, lastElementRef } = useInfiniteScroll<IChat>(
    httpService,
    {},
    [],
    0,
    15
  );

  const children = data.map((chat, index) => {
    const otherUserProfile =
      chat.first_user_profile.user.username === auth?.username
        ? chat.second_user_profile
        : chat.first_user_profile;
    return (
      <Card
        key={chat.id}
        as={NavLink}
        to={`/messages/${chat.id}`}
        width={"100%"}
        borderRadius={0}
        bg={chat.id === parseInt(chat_id as string) ? "gray.800" : "black"}
        ref={index === data.length - 1 ? lastElementRef : null}
      >
        <CardBody>
          <HStack alignItems={"flex-start"}>
            <Avatar src={`/${otherUserProfile.avatar}`}></Avatar>
            <Text fontWeight={"bold"}>{otherUserProfile.user.name}</Text>
            <Text fontWeight={"light"} color={"gray.500"}>
              @{otherUserProfile.user.username} &#183;{" "}
              {chat.last_edit.substring(0, 3)}
            </Text>
          </HStack>
        </CardBody>
      </Card>
    );
  });

  return (
    <>
      <ChatComposeModal />
      {isLoading ? (
        <Spinner />
      ) : (
        <VStack
          overflowY={"scroll"}
          alignItems={"flex-start"}
          align={"stretch"}
          height={"80vh"}
        >
          {children}
        </VStack>
      )}
    </>
  );
};
