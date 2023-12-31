import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";

const TrendEntry = () => {
  return (
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
          <Button p={0} variant={"ghost"} borderRadius={30}>
            ...
          </Button>
        </HStack>
      </CardHeader>
      <CardBody py={2}>
        <Heading fontSize={"md"}>Trend</Heading>
      </CardBody>
    </Card>
  );
};

export const Trend = () => {
  return (
    <Card width={"100%"} borderRadius={15} pt={2}>
      <CardHeader py={1}>
        <Heading fontSize={"xl"}>What's happening</Heading>
      </CardHeader>
      <CardBody py={1} px={0}>
        <VStack align={"stretch"} mb={2}>
          <TrendEntry />
        </VStack>
      </CardBody>
    </Card>
  );
};
