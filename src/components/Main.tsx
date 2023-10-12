import { Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { Home } from "./Home";

export const Main = () => {
  return (
    <Grid
      templateAreas={`"sidebar main trending"`}
      templateColumns={"0.5fr 2fr 1fr"}
      gap={3}
    >
      <GridItem area={"sidebar"}>
        <Sidebar />
      </GridItem>
      <GridItem area={"main"}>
        <Home />
      </GridItem>
      <GridItem area={"trending"} bg={"blue"}>
        trending
      </GridItem>
    </Grid>
  );
};
