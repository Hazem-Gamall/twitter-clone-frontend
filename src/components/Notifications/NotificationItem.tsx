import { BiReply, BiRepost } from "react-icons/bi";
import { INotification } from "../../types/Notification";
import { AiFillHeart } from "react-icons/ai";
import { GoMention } from "react-icons/go";
import {
  Card,
  Divider,
  Grid,
  GridItem,
  HStack,
  Icon,
  Text,
  VStack,
  forwardRef,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Post } from "../Post/Post";
import { useEffect } from "react";
import { genericServiceFactory } from "../../services/httpServiceFactories";

interface NotificationProps {
  notification: INotification;
}

const NotificationBody = ({ notification }: NotificationProps) => {
  if (notification.notification_type === "M")
    return <Post post={notification.post} variant="none" />;
  const notification_text_map: { [key: string]: any } = {
    T: "reposted your post",
    R: "replied to your post",
    L: "liked your post",
  };
  return (
    <VStack alignItems={"flex-start"} p={4}>
      <p>
        <Text as={"span"} fontWeight={"extrabold"}>
          {notification.issuer.user.username}
        </Text>{" "}
        <Text as={"span"} fontWeight={"light"}>
          {notification_text_map[notification.notification_type]}
        </Text>
      </p>
      <Text color={"gray.600"}>{notification.post.text}</Text>
    </VStack>
  );
};

interface Props {
  username: string;
  notification: INotification;
  viewNotification: (notification: INotification) => void;
}

export const NotificationItem = forwardRef(
  ({ username, notification, viewNotification }: Props, ref) => {
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

    const service = genericServiceFactory(
      `/notifications/${notification.id}/viewed`
    );

    useEffect(() => {
      if (notification.viewed) return;
      const { request, cancel } = service.list();
      request.then(() =>
        setTimeout(() => viewNotification(notification), 5000)
      );
      return () => cancel();
    }, []);

    return (
      <>
        <Card
          ref={ref}
          as={Link}
          to={`/${username}/status/${notification.post.id}`}
          borderRadius={0}
          bg={notification.viewed ? "black" : "gray.800"}
          _hover={{ background: "gray.900" }}
        >
          <Grid
            gridTemplateAreas={`"type content"`}
            templateColumns={"1fr 7fr"}
          >
            <GridItem area={"type"}>
              <HStack justifyContent={"center"} height={"100%"}>
                <Icon
                  boxSize={10}
                  as={notification_type_to_icon[notification.notification_type]}
                  color={
                    notification_type_to_color[notification.notification_type]
                  }
                />
              </HStack>
            </GridItem>
            <GridItem area={"content"}>
              <NotificationBody notification={notification} />
            </GridItem>
          </Grid>
        </Card>
        <Divider />
      </>
    );
  }
);
