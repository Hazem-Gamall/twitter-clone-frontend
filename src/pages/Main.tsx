import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import { Home } from "./Home";
import { Trend } from "./Trending";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "../components/RequireAuth";
import { Profile } from "./Profile";
import { Search } from "./Search";
import { Notifications } from "./Notifications";
import { ChatWindow } from "../components/ChatWindow";
import { API_BASE_URL } from "../services/apiClient";
import { useEffect, useState } from "react";
import { SearchBar } from "../components/Search/SearchBar";

export const Main = () => {
  const [hasNotification, setHasNotification] = useState(false);
  const [hasMessage, setHasMessage] = useState(false);
  useEffect(() => {
    const eventSource = new EventSource(`${API_BASE_URL}/chats/sse/`, {
      withCredentials: true,
    });
    eventSource.onmessage = () => {
      setHasMessage(true);
    };
    return () => eventSource.close();
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(`${API_BASE_URL}/notifications/sse/`, {
      withCredentials: true,
    });
    eventSource.onmessage = () => {
      setHasNotification(true);
    };
    return () => eventSource.close();
  }, []);
  return (
    <>
      <Grid
        templateAreas={`"sidebar main trending"`}
        templateColumns={"0.7fr 2fr 1.2fr"}
        py={3}
        px={5}
        height={"100vh"}
      >
        <GridItem
          area={"sidebar"}
          borderRightWidth={1}
          borderRightColor={"gray.800"}
          pr={3}
        >
          <Sidebar
            hasNotification={hasNotification}
            setHasNotification={setHasNotification}
            hasMessage={hasMessage}
          />
        </GridItem>

        <GridItem area={"main"}>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Home />} />
              <Route path="/:username/*" element={<Profile />} />
              <Route path="search" element={<Search />} />
              <Route path="explore" element={<Search />} />
              <Route path="notifications" element={<Notifications />} />
              <Route
                path="*"
                element={(() => (
                  <div>not found</div>
                ))()}
              />
            </Route>
          </Routes>
        </GridItem>

        <GridItem
          borderLeftWidth={1}
          borderLeftColor={"gray.800"}
          area={"trending"}
        >
          <VStack px={5} mr={3} spacing={10} height={"100%"}>
            <Routes>
              <Route path="search" element={<Trend />} />
              <Route path="explore" element={<Trend />} />
              <Route path="*" element={<SearchBar navigateToSearch />} />
            </Routes>
          </VStack>
          <ChatWindow hasMessage={hasMessage} setHasMessage={setHasMessage} />
        </GridItem>
      </Grid>
    </>
  );
};
