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

interface Props {
  hasMessage: boolean;
  setHasMessage: (hasMessage: boolean) => void;
}

export const ChatWindow = ({ hasMessage = false, setHasMessage }: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  const [chatId, setChatId] = useState(-1);
  const [inChat, setInChat] = useState(false);

  return (
    <Box position={"fixed"} bottom={"0px"} bg={"black"} ml={10} width={"26vw"}>
      <HStack
        onClick={() => {
          onToggle();
          setHasMessage(false);
        }}
        justifyContent={"space-between"}
        borderWidth={2}
        borderBottomWidth={0}
        borderRadius={10}
        borderBottomRadius={0}
        p={2}
        bg={hasMessage ? "#1D9BF0" : ""}
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
        <Box borderWidth={2} borderTopWidth={0}>
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
                height={"70vh"}
                overflowY={"scroll"}
                flexDirection={"column-reverse"}
                align={"stretch"}
              >
                <Chat chatId={chatId} numberOfMessages={5} />
              </VStack>
            </>
          ) : (
            <Box height={"70vh"} overflowY={"scroll"}>
              {isOpen && (
                <ChatList
                  onClick={(clicked_chat_id) => {
                    setChatId(clicked_chat_id);
                    setInChat(true);
                  }}
                />
              )}
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};
