import { Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";

export const Home = () => {
  return (
    <Grid templateAreas={`"sidebar main trending"`}>
      <GridItem area={"sidebar"} width={"250px"}>
        <Sidebar />
      </GridItem>
      <GridItem area={"main"} bg={"red"}>
        main
      </GridItem>
      <GridItem area={"trending"} bg={"yellow"}>
        trending
      </GridItem>
    </Grid>
  );
};
