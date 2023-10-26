import {
  Card,
  CardBody,
  HStack,
  Text,
  Grid,
  GridItem,
  CardHeader,
  Icon,
} from "@chakra-ui/react";
import IPost from "../../types/Post";
import { PostInteractionButtonGroup } from "./PostInteractionButtonGroup";
import { BiRepost } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";
import { PostAvatar } from "./PostAvatar";
import { PostContent } from "./PostContent";

interface Props {
  post: IPost;
  variant: "reply" | "main" | "none";
  reply?: boolean;
}

export const Post = ({ post, reply, variant = "none" }: Props) => {
  const postToRender = post.repost ? post.embed : post;

  const { auth } = useAuth();

  return (
    <Card
      width={"100%"}
      variant={"unstyled"}
      bg="black"
      _hover={{ bg: "gray.900", cursor: "pointer" }}
      pt={2}
      pl={4}
      borderRadius={0}
      borderLeftWidth={1}
      borderLeftColor={"gray.800"}
      borderRightWidth={1}
      borderRightColor={"gray.800"}
    >
      {post.repost && (
        <CardHeader color={"gray"} fontWeight={"bold"} ml={10}>
          <HStack>
            <Icon fontSize={"xl"} as={BiRepost} />
            <Text fontSize={"sm"}>
              {post.post_user.username === auth.username
                ? "You"
                : post.post_user.username}{" "}
              reposted
            </Text>
          </HStack>
        </CardHeader>
      )}
      <CardBody py={0}>
        <Grid templateAreas={`"avatar content"`} templateColumns={"1fr 10fr"}>
          <GridItem area={"avatar"}>
            <PostAvatar variant={variant} post={postToRender} />
          </GridItem>
          <GridItem area={"content"}>
            <PostContent post={postToRender} />
            {reply || <PostInteractionButtonGroup post={postToRender} />}
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};
