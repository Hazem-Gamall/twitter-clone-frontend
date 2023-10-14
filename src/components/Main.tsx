import { Divider, Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { Home } from "./Home";
import { Trending } from "./Trending";

export const Main = () => {
  return (
    <Grid
      templateAreas={`"sidebar main trending"`}
      templateColumns={"0.5fr 2fr 1fr"}
      gap={3}
      py={3}
      px={5}
    >
      <GridItem area={"sidebar"} borderRightWidth={1} pr={3}>
        <Sidebar />
      </GridItem>

      <GridItem area={"main"}>
        <Home />
      </GridItem>

      <GridItem area={"trending"}>
        <Trending />
      </GridItem>
    </Grid>
  );
};
