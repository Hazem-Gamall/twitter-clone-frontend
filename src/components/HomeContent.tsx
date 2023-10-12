import { VStack } from "@chakra-ui/react";
import { NewTweet } from "./NewTweet";
import { Tweet } from "./Tweet";

export const HomeContent = () => {
  return (
    <VStack>
      <NewTweet />
      <Tweet />
    </VStack>
  );
};
