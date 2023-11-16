import { Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { Chat } from "./Chat";
import { ChatList } from "./ChatList";
import useAuth from "../hooks/useAuth";
import { Route, Routes } from "react-router-dom";

export const Messages = () => {
  const { auth } = useAuth();

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
          <Routes>
            <Route path="/:chat_id" element={<ChatList />} />
            <Route path="/" element={<ChatList />} />
          </Routes>
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