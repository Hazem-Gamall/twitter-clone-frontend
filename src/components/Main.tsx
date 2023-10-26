import { Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { Home } from "./Home";
import { Trending } from "./Trending";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { Profile } from "./Profile/Profile";

export const Main = () => {
  return (
    <>
      <Grid
        templateAreas={`"sidebar main trending"`}
        templateColumns={"0.7fr 2fr 1.2fr"}
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
              <Route path="/:username/*" element={<Profile />} />
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
