import { Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import { Chat } from "../components/Chat/Chat";
import { ChatListContainer } from "../components/Chat/ChatListContainer";
import { Route, Routes } from "react-router-dom";
import { ChatContainer } from "../components/Chat/ChatContainer";

export const Messages = () => {
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
            <Route path="/:chat_id" element={<ChatListContainer />} />
            <Route path="/" element={<ChatListContainer />} />
          </Routes>
        </GridItem>

        <GridItem
          borderLeftWidth={1}
          borderLeftColor={"gray.800"}
          area={"chat"}
        >
          <Routes>
            <Route path="/:chat_id" element={<ChatContainer />} />
            <Route path="/" element={<div>gello</div>} />
          </Routes>
        </GridItem>
      </Grid>
    </>
  );
};
