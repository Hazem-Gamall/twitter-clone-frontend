import { Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { Home } from "./Home";
import { Trending } from "./Trending";
import { Route, Routes } from "react-router-dom";
import { Profile } from "./Profile/components/Profile";
import { RequireAuth } from "./RequireAuth";

export const Main = () => {
  return (
    <>
      <Grid
        templateAreas={`"sidebar main trending"`}
        templateColumns={"0.5fr 2fr 1fr"}
        py={3}
        px={5}
      >
        <GridItem area={"sidebar"} borderRightWidth={1} pr={3}>
          <Sidebar />
        </GridItem>

        <GridItem area={"main"}>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Home />} />
              <Route path="/:username" element={<Profile />} />
              <Route
                path="*"
                element={(() => (
                  <div>not found</div>
                ))()}
              />
            </Route>
          </Routes>
        </GridItem>

        <GridItem area={"trending"}>
          <Trending />
        </GridItem>
      </Grid>
    </>
  );
};
