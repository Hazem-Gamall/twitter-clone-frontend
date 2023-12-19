import { BiReply, BiRepost } from "react-icons/bi";
import { INotification } from "../../types/Notification";
import { AiFillHeart } from "react-icons/ai";
import { GoMention } from "react-icons/go";
import { Card, Grid, GridItem, HStack, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Post } from "../Post/Post";
import { useEffect } from "react";
import useApiClient from "../../hooks/useApiClient";

interface Props {
  username: string;
  notification: INotification;
  viewNotification: (notification: INotification) => void;
}

export const NotificationItem = ({
  username,
  notification,
  viewNotification,
}: Props) => {
  const notification_type_to_icon: { [key: string]: any } = {
    R: BiReply,
    T: BiRepost,
    L: AiFillHeart,
    M: GoMention,
  };

  const notification_type_to_color: { [key: string]: any } = {
    R: "white",
    T: "green",
    L: "red",
    M: "blue",
  };

  const apiClient = useApiClient();

  useEffect(() => {
    if (!notification.viewed)
      apiClient
        .get(`/notifications/${notification.id}/viewed`)
        .then(() => setTimeout(() => viewNotification(notification), 5000));
  }, []);

  return (
    <Card
      as={Link}
      to={`/${username}/status/${notification.post.id}`}
      borderRadius={0}
      bg={notification.viewed ? "black" : "gray.800"}
      _hover={{ background: "gray.900" }}
    >
      <Grid gridTemplateAreas={`"type content"`} templateColumns={"1fr 7fr"}>
        <GridItem area={"type"}>
          <HStack justifyContent={"center"} height={"100%"}>
            <Icon
              boxSize={10}
              as={notification_type_to_icon[notification.notification_type]}
              color={notification_type_to_color[notification.notification_type]}
            />
          </HStack>
        </GridItem>
        <GridItem area={"content"}>
          <Post post={notification.post} variant="none" />
        </GridItem>
      </Grid>
    </Card>
  );
};
