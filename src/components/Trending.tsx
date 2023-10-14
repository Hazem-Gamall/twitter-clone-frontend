import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Text,
  HStack,
  Button,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <InputGroup variant={"filled"} bg={"gray.800"} borderRadius={30}>
      <InputLeftElement children={<BsSearch />} />
      <Input borderRadius={30} placeholder="Search" />
    </InputGroup>
  );
};

const TrendEntry = () => {
  return (
    <LinkBox width={"100%"} pb={3}>
      <Card
        variant={""}
        bg={"gray.700"}
        _hover={{ bg: "gray.650" }}
        borderRadius={0}
      >
        <CardHeader py={1}>
          <HStack justifyContent={"space-between"}>
            <Text color={"gray.400"} fontSize={"sm"}>
              Category
            </Text>
            <Button p={0} variant={"ghost"} borderRadius={30} zIndex={1}>
              ...
            </Button>
          </HStack>
        </CardHeader>
        <LinkOverlay href="/">
          <CardBody py={2}>
            <Heading fontSize={"md"}>Trend</Heading>
          </CardBody>
        </LinkOverlay>
      </Card>
    </LinkBox>
  );
};

const Trend = () => {
  return (
    <Card width={"100%"} borderRadius={15} pt={2}>
      <CardHeader py={1}>
        <Heading fontSize={"xl"}>What's happening</Heading>
      </CardHeader>
      <CardBody py={1} px={0}>
        <VStack>
          <TrendEntry />
        </VStack>
      </CardBody>
    </Card>
  );
};

export const Trending = () => {
  return (
    <VStack px={5} mr={3} spacing={10}>
      <Search />
      <Trend />
    </VStack>
  );
};
