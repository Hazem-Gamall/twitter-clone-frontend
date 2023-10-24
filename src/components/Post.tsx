import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Image,
  Link as ChakraLink,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import IPost from "../types/Post";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Props {
  post: IPost;
}

export const Post = ({ post }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Card
      width={"100%"}
      variant={"unstyled"}
      bg="black"
      _hover={{ bg: "gray.900", cursor: "pointer" }}
      p={3}
      borderRadius={0}
      onClick={() =>
        navigate(`/${post.post_user.username}/status/${post.id}`, {
          state: { from: location.pathname },
        })
      }
    >
      <CardHeader p={0}></CardHeader>

      <CardBody py={0} pb={5}>
        <Grid templateAreas={`"avatar content"`} templateColumns={"1fr 10fr"}>
          <GridItem area={"avatar"}>
            <Avatar
              as={Link}
              to={`/${post.post_user.username}`}
              src={post.post_user.avatar}
            />
          </GridItem>
          <GridItem area={"content"}>
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
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};
