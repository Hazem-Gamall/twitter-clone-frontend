import { Button, ButtonGroup, Text, VStack } from "@chakra-ui/react";
import { HomeContent } from "../components/HomeContent";
import { PostsProvider } from "../context/PostsProvider";

export const Home = () => {
  return (
    <VStack align={"stretch"}>
      <Text textAlign={"left"} fontWeight={"bold"} fontSize={"xl"} ml={2}>
        Home
      </Text>
      <ButtonGroup
        isAttached
        variant={"ghost"}
        width={"100%"}
        justifyContent={"space-evenly"}
      >
        <Button borderRadius={0} width={"100%"}>
          For you
        </Button>
        <Button borderRadius={0} width={"100%"}>
          Following
        </Button>
      </ButtonGroup>
      <PostsProvider>
        <HomeContent />
      </PostsProvider>
    </VStack>
  );
};
