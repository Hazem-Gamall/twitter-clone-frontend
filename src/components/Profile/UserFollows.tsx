import {
  Avatar,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  Heading,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IUserProfile } from "../../types/User";
import { Link, useParams } from "react-router-dom";
import { httpServiceFactory } from "../../services/httpServiceFactories";
import { HttpService } from "../../services/HttpService";
import useData from "../../hooks/useList";
import { TopBar } from "./TopBar";

const Follow = ({ userProfile }: { userProfile: IUserProfile | undefined }) => {
  if (!userProfile) return;
  return (
    <Card
      bg={"black"}
      p={0}
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
};

interface FollowUser {
  id: number;
  following_user_profile?: IUserProfile;
  user_profile?: IUserProfile;
}

const FollowList = ({
  username,
  type,
}: {
  username: string | undefined;
  type: "followers" | "following";
}) => {
  if (!username) return;
  const httpService = httpServiceFactory(
    HttpService,
    `/users/${username}/${type}`
  );
  const { data, error, isLoading } = useData<FollowUser>(httpService, {}, [
    username,
  ]);

  return (
    <VStack align={"stretch"}>
      {error && <div>error{error}</div>}

      {isLoading ? (
        <Spinner />
      ) : (
        data.map((follower) => (
          <Follow
            key={follower.id}
            userProfile={
              follower[
                type === "followers" ? "following_user_profile" : "user_profile"
              ]
            }
          />
        ))
      )}
    </VStack>
  );
};

interface Props {
  type: "followers" | "following";
}

export const UserFollows = ({ type }: Props) => {
  const { username } = useParams();
  const tab = type === "followers" ? 0 : 1;
  return (
    <>
      <TopBar username={username} />
      <Tabs index={tab}>
        <TabList justifyContent={"space-between"}>
          <Tab as={Link} to={`/${username}/followers`} flexGrow={1}>
            Followers
          </Tab>
          <Tab as={Link} to={`/${username}/following`} flexGrow={1}>
            Following
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <FollowList type="followers" username={username} />
          </TabPanel>
          <TabPanel p={0}>
            <FollowList type="following" username={username} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
