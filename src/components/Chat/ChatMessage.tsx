import { Box, forwardRef } from "@chakra-ui/react";
import IMessage from "../../types/Message";
import useAuth from "../../hooks/useAuth";
import { genericServiceFactory } from "../../services/httpServiceFactories";
import { useEffect } from "react";

interface Props {
  message: IMessage;
  setMessage: (message: IMessage) => void;
}

export const ChatMessage = forwardRef(({ message, setMessage }: Props, ref) => {
  const { auth } = useAuth();
  const service = genericServiceFactory(`/chats/messages/seen`);

  useEffect(() => {
    if (message.seen) return;
    if (message.author.user.id === auth?.userProfile.user.id) return;
    const { request, cancel } = service.retrieve<IMessage>(
      message.id.toString()
    );
    request.then(() => setMessage(message));

    return () => cancel();
  }, []);

  return (
    <Box
      ref={ref}
      borderRadius={30}
      p={2}
      alignSelf={
        message.author.user.username === auth?.userProfile.user.username
          ? "flex-end"
          : "flex-start"
      }
      bg={
        message.author.user.username === auth?.userProfile.user.username
          ? "blue"
          : "gray"
      }
      key={message.id}
    >
      {message.text}
    </Box>
  );
});
