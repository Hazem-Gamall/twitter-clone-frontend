import { Button, ButtonGroup, Text, VStack } from "@chakra-ui/react";

export const Home = () => {
  return (
    <VStack width={"100%"} alignItems={"start"}>
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
    </VStack>
  );
};
