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

export const ChatList = () => {
  const { auth } = useAuth();
  console.log("username", auth?.username);

  const httpService = userChatsServiceFactory(auth?.username as string);

  const { data, error, isLoading, lastElementRef } =
    useInfiniteScroll<IChat>(httpService);
  console.log("data", data);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data.map((chat) => (
          <Card key={chat.id}>
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
