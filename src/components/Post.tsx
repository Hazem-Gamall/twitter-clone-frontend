import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Image,
  Link as ChakraLink,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import IPost from "./Profile/types/Post";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface Props {
  post: IPost;
}

export const Post = ({ post }: Props) => {
  const { auth } = useAuth();
  return (
    <LinkBox as={"article"} width={"100%"} borderBottomWidth={1}>
      <Card
        width={"100%"}
        variant={"unstyled"}
        bg="black"
        _hover={{ bg: "gray.900" }}
        p={2}
        borderRadius={0}
      >
        <CardHeader py={0} pt={3}>
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Avatar src={post.post_user.avatar} />
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
        </CardHeader>
        <LinkOverlay as={Link} to={`/${auth.username}/status/${post.id}`}>
          <CardBody px={20} py={0} pb={5}>
            <Text>{post.text}</Text>

            <Image></Image>
          </CardBody>
        </LinkOverlay>
      </Card>
    </LinkBox>
  );
};
