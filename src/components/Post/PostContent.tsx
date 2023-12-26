import {
  HStack,
  Link as ChakraLink,
  Text,
  Image,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import IPost, { Mention } from "../../types/Post";
import { Link, useNavigate } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import usePosts from "../../hooks/usePosts";
import { postsServiceFatory } from "../../services/httpServiceFactories";
import useAuth from "../../hooks/useAuth";
import mentionPattern from "../../utils/mentionPattern";
import formatDate from "../../utils/formatDate";

const isTextAfterLastMatch = (trimIndex: number, text: string) =>
  trimIndex < text.length;

const PostText = ({
  text,
  mentions,
}: {
  text: string;
  mentions: Mention[];
}) => {
  const matches = text.matchAll(mentionPattern);

  let trimIndex = 0;
  let children = [];
  console.log("matches length", [...matches].length);

  for (const mention of mentions) {
    const mentionText = text.substring(mention.start_index, mention.end_index);
    console.log("text", text);
    console.log("mentionText", mentionText);

    children.push(
      <span>{text.substring(trimIndex, mention.start_index)}</span>,
      <ChakraLink
        onClick={(ev) => ev.stopPropagation()}
        zIndex={2}
        color={"rgb(29, 155, 240)"}
        as={Link}
        to={`/${mentionText.substring(1)}`}
      >
        {mentionText}
      </ChakraLink>
    );

    trimIndex = mention.end_index;
  }

  if (isTextAfterLastMatch(trimIndex, text)) {
    children.push(<span>{text.substring(trimIndex)}</span>);
  }

  return <Text>{...children}</Text>;
};

export const PostContent = ({ post }: { post: IPost }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { posts, setPosts } = usePosts();
  const httpService = postsServiceFatory();
  const handleDelete = () => {
    const { request } = httpService.delete(post.id);
    request.then(() => {
      if (posts && setPosts)
        setPosts(
          posts?.filter((p) => p.id !== post.id && p?.embed?.id !== post.id)
        );
    });
  };

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
            @{post.post_user.username} &#183;{" "}
            {formatDate(new Date(post.creation))}
          </ChakraLink>
        </HStack>
        <Menu>
          <MenuButton
            borderRadius={30}
            p={0}
            as={IconButton}
            variant={"ghost"}
            icon={<FiMoreHorizontal />}
          />
          <MenuList>
            {post.post_user.username == auth?.username && (
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            )}
          </MenuList>
        </Menu>
      </HStack>
      <VStack
        alignItems={"flex-start"}
        onClick={() =>
          navigate(`/${post.post_user.username}/status/${post.id}`)
        }
      >
        <PostText text={post.text} mentions={post.post_mentions} />

        {post.media.map((media_object) => (
          <Image
            key={media_object.id}
            boxSize={400}
            objectFit={"cover"}
            src={`${media_object.file}`}
          ></Image>
        ))}
      </VStack>
    </>
  );
};
