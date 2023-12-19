import { Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { Home } from "../pages/Home";
import { Trending } from "./Trending";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { Profile } from "../pages/Profile";
import { Search } from "../pages/Search";
import { Notifications } from "../pages/Notifications";

export const Main = () => {
  return (
    <>
      <Grid
        templateAreas={`"sidebar main trending"`}
        templateColumns={"0.7fr 2fr 1.2fr"}
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

        <GridItem area={"main"}>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Home />} />
              <Route path="/:username/*" element={<Profile />} />
              <Route path="search" element={<Search />} />
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
          <Trending />
        </GridItem>
      </Grid>
    </>
  );
};
