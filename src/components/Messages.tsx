import { Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { Chat } from "./Chat";
import { ChatList } from "./ChatList";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

export const Messages = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8000/ws/chat/1/?token=${auth?.access}`
    );

    ws.onmessage = (ev) => console.log(ev);
    ws.onclose = (ev) => console.log(ev);

    return () => ws.close();
  }, []);

  return (
    <>
      <Grid
        templateAreas={`"sidebar chat-list chat"`}
        templateColumns={"0.7fr 1.2fr 2fr"}
        py={3}
        px={5}
      >
        <GridItem
          area={"sidebar"}
          borderRightWidth={1}
          borderRightColor={"gray.800"}
          pr={3}
        >
          <Sidebar />
        </GridItem>

        <GridItem area={"chat-list"}>
          <ChatList />
        </GridItem>

        <GridItem
          borderLeftWidth={1}
          borderLeftColor={"gray.800"}
          area={"chat"}
        >
          <Routes>
            <Route path="/:chat_id" element={<Chat />} />
            <Route path="/" element={<div>gello</div>} />
          </Routes>
        </GridItem>
      </Grid>
    </>
  );
};
