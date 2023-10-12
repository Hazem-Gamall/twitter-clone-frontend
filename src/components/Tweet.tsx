import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";

export const Tweet = () => {
  return (
    <LinkBox as={"article"}>
      <LinkOverlay href="/">
        <Card
          width={"100%"}
          variant={"unstyled"}
          bg="black"
          _hover={{ bg: "gray.900" }}
          p={2}
        >
          <CardHeader py={0} pt={3}>
            <HStack justifyContent={"space-between"}>
              <HStack>
                <Avatar name="test" />
                <Link href="/22">Test</Link>
                <Link href="t" fontWeight={"light"} color={"gray.500"}>
                  @test &#183; 14m
                </Link>
              </HStack>
              <Button
                zIndex={3}
                variant={"ghost"}
                borderRadius={30}
                onClick={() => console.log("button click")}
              >
                ...
              </Button>
            </HStack>
          </CardHeader>
          <CardBody px={20} py={0} pb={5}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad et
              suscipit ipsa neque veniam optio, laboriosam esse officiis ducimus
              sit! Reprehenderit ducimus vitae harum laudantium, assumenda
              expedita saepe amet dolorem? Non voluptates aliquid molestiae,
              explicabo aut earum unde necessitatibus fugit ullam ipsam ad quo
              quaerat eius consequatur sit, itaque dolorem ut deserunt.
              Reiciendis illo at dolorum incidunt pariatur? Vitae, maxime!
            </Text>

            <Image></Image>
          </CardBody>
        </Card>
      </LinkOverlay>
    </LinkBox>
  );
};
