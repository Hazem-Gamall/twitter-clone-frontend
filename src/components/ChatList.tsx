import {
  Avatar,
  Card,
  CardBody,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import IChat from "../types/Chat";
import { userChatsServiceFactory } from "../services/httpServiceFactories";
import useAuth from "../hooks/useAuth";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { NavLink, useParams } from "react-router-dom";

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

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data.map((chat, index) => (
          <Card
            key={chat.id}
            as={NavLink}
            to={`/messages/${chat.id}`}
            borderRadius={0}
            bg={chat.id === parseInt(chat_id as string) ? "gray.800" : "black"}
            ref={index === data.length - 1 ? lastElementRef : null}
          >
            <CardBody>
              <HStack alignItems={"flex-start"}>
                <Avatar src={chat.first_user_profile.avatar}></Avatar>
                <Text fontWeight={"bold"}>
                  {chat.first_user_profile.user.name}
                </Text>
                <Text fontWeight={"light"} color={"gray.500"}>
                  @{chat.first_user_profile.user.username} &#183;{" "}
                  {chat.last_edit.substring(0, 3)}
                </Text>
              </HStack>
            </CardBody>
          </Card>
        ))
      )}
    </>
  );
};
