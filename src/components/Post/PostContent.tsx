import {
  HStack,
  Link as ChakraLink,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import IPost from "../../types/Post";
import { Link } from "react-router-dom";

export const PostContent = ({ post }: { post: IPost }) => {
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

      {post.media.map((media_object) => (
        <Image
          boxSize={400}
          objectFit={"cover"}
          src={`http://localhost:8000${media_object.file}`}
        ></Image>
      ))}
    </>
  );
};
