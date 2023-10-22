import { VStack } from "@chakra-ui/react";
import { NewPost } from "./NewPost";

export const HomeContent = () => {
  return (
    <VStack>
      <NewPost />
      {/* <Post text="test" /> */}
    </VStack>
  );
};
