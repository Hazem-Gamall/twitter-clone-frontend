import { Box, Button, ButtonGroup, Text, VStack } from "@chakra-ui/react";
import { HomeContent } from "../components/HomeContent";
import { PostsProvider } from "../context/PostsProvider";
import { useState } from "react";
import { IForYouFilter } from "../types/ForYouFilter";

interface HomeContentFilterButtonProps {
  filter: IForYouFilter;
  setFilter: (filter: IForYouFilter) => void;
  componentFilter: IForYouFilter;
  buttonText: string;
}
const HomeContentFilterButton = ({
  filter,
  setFilter,
  componentFilter,
  buttonText,
}: HomeContentFilterButtonProps) => {
  return (
    <Button
      borderRadius={0}
      onClick={() => setFilter(componentFilter)}
      width={"100%"}
      py={"4vh"}
    >
      <VStack>
        <Text color={filter !== componentFilter ? "gray.600" : ""}>
          {buttonText}
        </Text>

        <Box
          width={"100%"}
          bg={filter === componentFilter ? "twitter.300" : ""}
          height={"4px"}
          borderRadius={35}
        />
      </VStack>
    </Button>
  );
};

export const Home = () => {
  const [forYouFilter, setForYouFilter] = useState<IForYouFilter>("for you");
  return (
    <VStack align={"stretch"}>
      <ButtonGroup
        isAttached
        variant={"ghost"}
        width={"100%"}
        justifyContent={"space-evenly"}
      >
        <HomeContentFilterButton
          filter={forYouFilter}
          setFilter={setForYouFilter}
          buttonText="For you"
          componentFilter="for you"
        />
        <HomeContentFilterButton
          filter={forYouFilter}
          setFilter={setForYouFilter}
          buttonText="Following"
          componentFilter="following"
        />
      </ButtonGroup>
      <PostsProvider>
        <HomeContent forYouFilter={forYouFilter} />
      </PostsProvider>
    </VStack>
  );
};
