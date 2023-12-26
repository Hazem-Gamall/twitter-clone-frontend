import {
  Avatar,
  Badge,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import IChat from "../../types/Chat";
import { useParams } from "react-router-dom";
import { userChatsServiceFactory } from "../../services/httpServiceFactories";
import useAuth from "../../hooks/useAuth";
import { ChatComposeModal } from "./ChatComposeModal";
import formatDate from "../../utils/formatDate";

interface Props {
  onClick: (chatId: number) => void;
}

export const ChatList = ({ onClick }: Props) => {
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
        _hover={{ cursor: "pointer" }}
        key={chat.id}
        onClick={() => onClick(chat.id)}
        width={"100%"}
        borderRadius={0}
        bg={chat.id === parseInt(chat_id as string) ? "gray.800" : "black"}
        ref={index === data.length - 1 ? lastElementRef : null}
      >
        <CardBody>
          <Grid templateAreas={`"avatar content"`} templateColumns={"1fr 4fr"}>
            <GridItem area={"avatar"}>
              <Avatar src={`/${otherUserProfile.avatar}`}></Avatar>
            </GridItem>
            <GridItem area={"content"}>
              <HStack alignItems={"flex-start"}>
                <Text fontWeight={"bold"}>{otherUserProfile.user.name}</Text>
                <Text fontWeight={"light"} color={"gray.500"}>
                  @{otherUserProfile.user.username} &#183;{" "}
                  {formatDate(new Date(chat.last_message.last_edit))}
                </Text>
              </HStack>
              <HStack>
                <Text>{chat.last_message.text}</Text>
                {!chat.last_message.seen &&
                  chat.last_message.author.user.username !== auth?.username && (
                    <Badge ml={2} boxSize={2} borderRadius={35} bg="red">
                      &#8203;
                    </Badge>
                  )}
              </HStack>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    );
  });

  return (
    <>
      <ChatComposeModal />
      {isLoading ? <Spinner /> : children}
    </>
  );
};
