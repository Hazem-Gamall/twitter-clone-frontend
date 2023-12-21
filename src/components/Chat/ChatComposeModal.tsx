import {
  Avatar,
  Button,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { LuMailPlus } from "react-icons/lu";
import { useState } from "react";
import useList from "../../hooks/useList";
import {
  searchServiceFactory,
  userChatsServiceFactory,
} from "../../services/httpServiceFactories";
import { IUserProfile } from "../../types/User";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import IChat from "../../types/Chat";

export const ChatComposeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const httpService = searchServiceFactory("users");

  const { data, isLoading } = useList<IUserProfile>(
    httpService,
    { q: searchQuery },
    [searchQuery]
  );

  const navigate = useNavigate();

  const chatHttpService = userChatsServiceFactory(auth?.username as string);
  const createChat = (otherUserProfile: IUserProfile) => {
    const { request } = chatHttpService.create({
      username: otherUserProfile.user.username,
    });
    request
      .then((resp) => {
        console.log("created chat", resp);
        const chat = resp.data as IChat;
        onClose();
        navigate(`/messages/${chat.id}`);
      })
      .catch((err) => {
        console.log("unable to create chat", err);
      });
  };
  return (
    <>
      <IconButton
        aria-label="new chat"
        icon={<LuMailPlus />}
        onClick={onOpen}
        variant={"ghost"}
        borderRadius={30}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              onInput={(ev) => {
                setSearchQuery(ev.currentTarget.value);
              }}
            />

            <VStack bg={"black"} align={"stretch"}>
              {isLoading ? (
                <Spinner />
              ) : (
                data.map((userProfile) => (
                  <HStack
                    as={Button}
                    p={10}
                    justifyContent={"flex-start"}
                    onClick={() => createChat(userProfile)}
                  >
                    <Avatar src={userProfile.avatar}></Avatar>
                    <VStack>
                      <Text fontWeight={"bold"}>{userProfile.user.name}</Text>
                      <Text fontWeight={"light"} color={"gray.400"}>
                        {userProfile.user.username}
                      </Text>
                    </VStack>
                  </HStack>
                ))
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
