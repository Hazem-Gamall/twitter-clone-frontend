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
import { useNavigate } from "react-router-dom";

interface Props {
  post: IPost;
  variant: "reply" | "main" | "none";
  reply?: boolean;
  pt?: number;
}

export const Post = ({ post, reply, variant = "none", pt = 3 }: Props) => {
  const postToRender = post.repost ? post.embed : post;
  const navigate = useNavigate();

  const { auth } = useAuth();

  return (
    <Card
      width={"100%"}
      variant={"unstyled"}
      bg="black"
      _hover={{ bg: "gray.900", cursor: "pointer" }}
      pt={pt}
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
      <CardBody zIndex={0} py={0}>
        <Grid
          templateAreas={`"avatar content" "none btns"`}
          templateColumns={"1fr 10fr"}
        >
          <GridItem area={"avatar"}>
            <PostAvatar variant={variant} post={postToRender} />
          </GridItem>
          <GridItem
            area={"content"}
            onClick={() =>
              navigate(`/${post.post_user.username}/status/${post.id}`)
            }
          >
            <PostContent post={postToRender} />
          </GridItem>
          <GridItem area={"btns"}>
            {reply || <PostInteractionButtonGroup post={postToRender} />}
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};
