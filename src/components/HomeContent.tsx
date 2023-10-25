import { VStack } from "@chakra-ui/react";
import { NewPost } from "./Post/NewPost";

export const HomeContent = () => {
  return (
    <VStack>
      <NewPost />
      {/* <Post text="test" /> */}
    </VStack>
  );
};
