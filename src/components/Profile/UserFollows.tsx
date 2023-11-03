import {
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { IUserProfile } from "../../types/User";
import { Link, useParams } from "react-router-dom";
import { httpServiceFactory } from "../../services/httpServiceFactories";
import { HttpService } from "../../services/HttpService";
import { TopBar } from "./TopBar";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { UserCard } from "./UserCard";

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
  const { data, error, isLoading, lastElementRef } =
    useInfiniteScroll<FollowUser>(httpService, {}, [username]);

  return (
    <VStack align={"stretch"}>
      {error && <div>error{error}</div>}

      {isLoading ? (
        <Spinner />
      ) : (
        data.map((follower, index) => (
          <UserCard
            key={follower.id}
            ref={index === data.length - 1 ? lastElementRef : null}
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
