import {
  Avatar,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  Heading,
  Text,
  VStack,
  forwardRef,
} from "@chakra-ui/react";
import { IUserProfile } from "../../types/User";
import { Link } from "react-router-dom";

export const UserCard = forwardRef(
  ({ userProfile }: { userProfile: IUserProfile | undefined }, ref) => {
    if (!userProfile) return;
    return (
      <Card
        bg={"black"}
        p={0}
        ref={ref}
        width={"100%"}
        _hover={{ bg: "gray.900", cursor: "pointer" }}
        borderRadius={0}
      >
        <CardBody as={Link} to={`/${userProfile.user.username}`}>
          <Grid templateAreas={`"avatar content"`} templateColumns={"1fr 10fr"}>
            <GridItem area={"avatar"} pr={1}>
              <Avatar src={userProfile.avatar} />
            </GridItem>
            <GridItem area={"content"} pl={1}>
              <VStack alignItems={"flex-start"}>
                <HStack justifyContent={"space-between"}>
                  <VStack alignItems={"flex-start"}>
                    <Heading fontWeight={"bold"} fontSize={"md"}>
                      {userProfile.user.name}
                    </Heading>
                    <Text color={"gray.600"}>@{userProfile.user.username}</Text>
                  </VStack>
                </HStack>
                <Text>{userProfile.bio}</Text>
              </VStack>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    );
  }
);
