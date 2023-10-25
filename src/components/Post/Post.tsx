import {
  Avatar,
  Button,
  Card,
  CardBody,
  HStack,
  Image,
  Link as ChakraLink,
  Text,
  Grid,
  GridItem,
  CardFooter,
  CardHeader,
  Icon,
} from "@chakra-ui/react";
import IPost from "../../types/Post";
import { Link } from "react-router-dom";
import { PostInteractionButtonGroup } from "./PostInteractionButtonGroup";
import { BiRepost } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";

interface Props {
  post: IPost;
  reply?: boolean;
}

export const Post = ({ post, reply }: Props) => {
  const postToRender = post.repost ? post.embed : post;

  const { auth } = useAuth();

  return (
    <Card
      width={"100%"}
      variant={"unstyled"}
      bg="black"
      _hover={{ bg: "gray.900", cursor: "pointer" }}
      p={2}
      pl={4}
      pt={4}
      borderRadius={0}
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
            <Avatar
              as={Link}
              to={`/${postToRender.post_user.username}`}
              src={`http://localhost:8000${postToRender.post_user.avatar}`}
            />
          </GridItem>
          <GridItem area={"content"}>
            <HStack justifyContent={"space-between"}>
              <HStack>
                <ChakraLink
                  as={Link}
                  to={`/${postToRender.post_user.username}`}
                >
                  <Text fontWeight={"bold"}>{postToRender.post_user.name}</Text>
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  to={`/${postToRender.post_user.username}`}
                  fontWeight={"light"}
                  color={"gray.500"}
                >
                  @{postToRender.post_user.username} &#183;{" "}
                  {postToRender.creation}
                </ChakraLink>
              </HStack>
              <Button
                zIndex={1}
                variant={"ghost"}
                borderRadius={30}
                onClick={() => console.log("button click")}
              >
                ...
              </Button>
            </HStack>
            <Text>{postToRender.text}</Text>

            <Image></Image>
          </GridItem>
        </Grid>
      </CardBody>
      <CardFooter>
        {reply || <PostInteractionButtonGroup post={postToRender} />}
      </CardFooter>
    </Card>
  );
};
