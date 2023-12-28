import { HStack, Heading, IconButton, Text, VStack } from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface Props {
  username: string | undefined;
  postsCount?: number;
}

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      aria-label=""
      icon={<IoArrowBackOutline />}
      variant={"ghost"}
      fontSize={"xl"}
      borderRadius={30}
      onClick={() => navigate(-1)}
    />
  );
};

export const TopBar = ({ username, postsCount }: Props) => {
  return (
    <>
      <HStack justifyContent={"flex-start"} px={5}>
        <BackButton />
        <VStack spacing={0} alignItems={"flex-start"} pl={3}>
          <Heading as="h5" fontSize={"lg"}>
            {username}
          </Heading>
          {postsCount && (
            <Text fontSize={"sm"} color={"gray.500"}>
              postsCount
            </Text>
          )}
        </VStack>
      </HStack>
    </>
  );
};
