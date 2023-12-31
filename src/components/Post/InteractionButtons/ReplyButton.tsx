import {
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import IPost from "../../../types/Post";
import { FaRegComment } from "react-icons/fa6";
import { Post } from "../Post";
import { NewPost } from "../NewPost";

interface Props {
  count: number;
  post: IPost;
}

export const ReplyButton = ({ count, post }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack ml={0} spacing={0}>
      <IconButton
        variant={"ghost"}
        borderRadius={30}
        aria-label="post interaction button"
        icon={<FaRegComment />}
        onClick={onOpen}
        m={0}
        p={0}
      />
      <Text fontSize={"sm"}>{count}</Text>

      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg={"rgba(211,211,211,0.1)"} />
        <ModalContent bg={"black"}>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Post variant="none" reply={true} post={post} />
            <Text color={"gray.500"} fontWeight={"light"}>
              Replying to @{post.post_user.username}
            </Text>
            <NewPost reply_post={post} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  );
};
