import { HStack, Heading, IconButton, Text, VStack } from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";

export const TopBar = ({ username }: { username: string | undefined }) => {
  return (
    <>
      <HStack justifyContent={"flex-start"} px={5}>
        <IconButton
          aria-label=""
          icon={<IoArrowBackOutline />}
          variant={"ghost"}
          fontSize={"xl"}
          borderRadius={30}
        />
        <VStack spacing={0} alignItems={"flex-start"} pl={3}>
          <Heading as="h5" fontSize={"lg"}>
            {username}
          </Heading>
          <Text fontSize={"sm"} color={"gray.500"}>
            324 posts
          </Text>
        </VStack>
      </HStack>
    </>
  );
};
