import {
  HStack,
  Heading,
  Icon,
  Image,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";

import { BsCalendar3 } from "react-icons/bs";
import formatDate from "../../../utils/formatDate";
import { Link } from "react-router-dom";
import { IUserProfile } from "../../../types/User";
import useAuth from "../../../hooks/useAuth";
import { AuthUserDetailButtons } from "./profileContent/UserDetailButtons/AuthUserDetailButtons";
import { OtherUserDetailButtons } from "./profileContent/UserDetailButtons/OtherUserDetailButtons";

interface Props {
  userProfile: IUserProfile;
}

export const UserDetail = ({ userProfile }: Props) => {
  const { auth } = useAuth();
  return (
    <VStack align={"stretch"}>
      <Image
        overflow={"clip"}
        src="https://pbs.twimg.com/profile_banners/1434937735089958914/1673200466/1500x500"
      />
      <VStack align={"stretch"} mx={3}>
        <HStack justifyContent={"flex-end"}>
          {userProfile.user.username === auth.username ? (
            <AuthUserDetailButtons userProfile={userProfile} />
          ) : (
            <OtherUserDetailButtons />
          )}
        </HStack>

        <VStack ml={1} mt={10} alignItems={"flex-start"}>
          <VStack spacing={0} alignItems={"flex-start"}>
            <Heading fontSize={"2xl"}>{userProfile.user.name}</Heading>
            <Text color={"gray.600"}>@{userProfile.user.username}</Text>
          </VStack>
          <Text>Bio</Text>
          <Text color={"gray.600"}>
            <Icon as={BsCalendar3} /> Joined{" "}
            {formatDate(new Date(userProfile.user.date_joined))}
          </Text>
          <HStack justifyContent={"flex-start"}>
            <ChakraLink
              as={Link}
              to={`/${userProfile.user.username}/following`}
            >
              <Text as={"span"} fontWeight={"bold"}>
                {userProfile.following_count}
              </Text>
              <Text as={"span"} ml={1} color={"gray.600"} fontSize={"sm"}>
                Following
              </Text>
            </ChakraLink>

            <ChakraLink
              as={Link}
              to={`/${userProfile.user.username}/followers`}
            >
              <Text as={"span"} fontWeight={"bold"}>
                {userProfile.follower_count}
              </Text>
              <Text as={"span"} ml={1} color={"gray.600"} fontSize={"sm"}>
                Followers
              </Text>
            </ChakraLink>
          </HStack>
          <ChakraLink
            as={Link}
            to={`/${userProfile.user.username}/followers_you_follow`}
          >
            <Text color={"gray.600"}>Followed by</Text>
          </ChakraLink>
        </VStack>
      </VStack>
    </VStack>
  );
};
