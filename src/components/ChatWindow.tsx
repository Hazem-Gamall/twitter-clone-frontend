import {
  Box,
  Collapse,
  HStack,
  Heading,
  IconButton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { RxDoubleArrowUp, RxDoubleArrowDown } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";

import { ChatList } from "./Chat/ChatList";
import { useState } from "react";
import { Chat } from "./Chat/Chat";

export const ChatWindow = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [chatId, setChatId] = useState(-1);
  const [inChat, setInChat] = useState(false);

  return (
    <Box position={"sticky"} bottom={"0px"} pl={10} bg={"black"}>
      <HStack
        onClick={onToggle}
        justifyContent={"space-between"}
        borderWidth={2}
        borderBottomWidth={0}
        borderRadius={10}
        borderBottomRadius={0}
        p={2}
        _hover={{ cursor: "pointer" }}
      >
        <Heading as={"h2"}>Messages</Heading>
        <HStack>
          <IconButton
            aria-label="expand"
            icon={isOpen ? <RxDoubleArrowDown /> : <RxDoubleArrowUp />}
            size={"xs"}
            borderRadius={35}
          />
        </HStack>
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        {inChat ? (
          <>
            {" "}
            <IconButton
              aria-label="back"
              icon={<IoMdArrowBack />}
              onClick={() => setInChat(false)}
              borderRadius={35}
              bg="black"
            />
            <VStack
              height={"50vh"}
              overflowY={"scroll"}
              borderWidth={2}
              borderTopWidth={0}
              flexDirection={"column-reverse"}
              align={"stretch"}
            >
              <Chat chatId={chatId} numberOfMessages={5} />
            </VStack>
          </>
        ) : (
          <Box
            height={"50vh"}
            overflowY={"scroll"}
            borderWidth={2}
            borderTopWidth={0}
          >
            <ChatList
              onClick={(clicked_chat_id) => {
                setChatId(clicked_chat_id);
                setInChat(true);
              }}
            />
          </Box>
        )}
      </Collapse>
    </Box>
  );
};
