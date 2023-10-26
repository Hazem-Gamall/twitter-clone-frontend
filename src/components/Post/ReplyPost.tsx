import IPost from "../../types/Post";
import {
  Avatar,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  Text,
  Link as ChakraLink,
  Button,
  Image,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PostInteractionButtonGroup } from "./PostInteractionButtonGroup";

interface Props {
  post: IPost;
}

const PostContent = ({ post }: { post: IPost }) => {
  return (
    <>
      <HStack justifyContent={"space-between"}>
        <HStack>
          <ChakraLink as={Link} to={`/${post.post_user.username}`}>
            <Text fontWeight={"bold"}>{post.post_user.name}</Text>
          </ChakraLink>
          <ChakraLink
            as={Link}
            to={`/${post.post_user.username}`}
            fontWeight={"light"}
            color={"gray.500"}
          >
            @{post.post_user.username} &#183; {post.creation}
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
      <Text>{post.text}</Text>

      <Image></Image>
      <PostInteractionButtonGroup post={post} />
    </>
  );
};

const RepliedToPost = ({ post }: Props) => {
  return (
    <Card
      width={"100%"}
      variant={"unstyled"}
      bg="black"
      _hover={{ bg: "gray.900", cursor: "pointer" }}
      p={2}
      pl={2}
      pt={4}
      pb={0}
      borderRadius={0}
    >
      <CardBody py={0}>
        <Grid
          templateAreas={`"avatar content" "avatar content"`}
          templateColumns={"1fr 10fr"}
        >
          <GridItem area={"avatar"} mr={2}>
            <VStack height={"100%"}>
              <Avatar
                as={Link}
                to={`/${post.post_user.username}`}
                src={`http://localhost:8000${post.post_user.avatar}`}
              />
              <Divider
                orientation="vertical"
                borderWidth={2}
                height={"100%"}
              ></Divider>
            </VStack>
            <VStack height={"100%"} align={"stretch"}></VStack>
          </GridItem>
          <GridItem area={"content"}>
            <PostContent post={post} />
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};
const ReplyingPost = ({ post }: Props) => {
  return (
    <Card
      width={"100%"}
      variant={"unstyled"}
      bg="black"
      _hover={{ bg: "gray.900", cursor: "pointer" }}
      p={2}
      pl={2}
      pt={0}
      borderRadius={0}
    >
      <CardBody py={0}>
        <Grid
          templateAreas={`"avatar content" "avatar content"`}
          templateColumns={"1fr 10fr"}
        >
          <GridItem area={"avatar"} mr={2}>
            <VStack height={"100%"}>
              <Divider
                orientation="vertical"
                borderWidth={2}
                height={"10%"}
              ></Divider>
              <Avatar
                as={Link}
                to={`/${post.post_user.username}`}
                src={`http://localhost:8000${post.post_user.avatar}`}
              />
            </VStack>
            <VStack height={"100%"} align={"stretch"}></VStack>
          </GridItem>
          <GridItem area={"content"}>
            <PostContent post={post} />
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export const ReplyPost = ({ post }: Props) => {
  return (
    <>
      <RepliedToPost post={post.reply_to} />
      <ReplyingPost post={post} />
    </>
  );
};
