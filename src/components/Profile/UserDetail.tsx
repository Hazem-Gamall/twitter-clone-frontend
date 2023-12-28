import {
  HStack,
  Heading,
  Icon,
  Image,
  Link as ChakraLink,
  Text,
  VStack,
  Avatar,
} from "@chakra-ui/react";

import { BsCalendar3 } from "react-icons/bs";

import { Link } from "react-router-dom";
import { IUserProfile } from "../../types/User";
import useAuth from "../../hooks/useAuth";
import { AuthUserDetailButtons } from "./UserDetailButtons/AuthUserDetailButtons";
import { OtherUserDetailButtons } from "./UserDetailButtons/OtherUserDetailButtons";
import formatDate from "../../utils/formatDate";

const FollowersInCommonText = ({
  userProfile,
}: {
  userProfile: IUserProfile;
}) => {
  const { auth } = useAuth();
  let text = "";
  const followersInCommon = userProfile.followers_in_common;
  if (userProfile.user.id === auth?.userProfile.user.id) {
    text = "";
  } else if (followersInCommon.count === 0) {
    text = "Not followed by anyone you're following";
  } else if (followersInCommon.remaining === 0) {
    text = `
        Followed by
        ${followersInCommon.users.map(
          (up, ind) =>
            `${up.user.name}${
              ind === followersInCommon.users.length - 1 ? "" : ", "
            }`
        )}
      `;
  } else {
    text = `Followed by ${followersInCommon.users.map(
      (up) => `${up.user.username}, `
    )} and ${followersInCommon.remaining} others you know`;
  }
  return <Text color={"gray.600"}>{text}</Text>;
};

interface Props {
  userProfile: IUserProfile;
  setUserProfile: (userProfile: IUserProfile) => void;
}

export const UserDetail = ({ userProfile, setUserProfile }: Props) => {
  const { auth } = useAuth();
  return (
    <VStack align={"stretch"}>
      <Image
        objectFit={"cover"}
        maxHeight={"220px"}
        height={"220px"}
        src={userProfile.cover_picture}
      />
      <VStack align={"stretch"} mx={3}>
        <HStack justifyContent={"space-between"}>
          <Avatar
            name={userProfile.user.name}
            src={userProfile.avatar}
            border={"4px"}
            color={"black"}
            mt={"-5vw"}
            boxSize={130}
          />
          <HStack justifyContent={"flex-end"}>
            {userProfile.user.username === auth?.username ? (
              <AuthUserDetailButtons
                userProfile={userProfile}
                setUserProfile={setUserProfile}
              />
            ) : (
              <OtherUserDetailButtons
                userProfile={userProfile}
                setUserProfile={setUserProfile}
              />
            )}
          </HStack>
        </HStack>

        <VStack ml={1} alignItems={"flex-start"}>
          <VStack spacing={0} alignItems={"flex-start"}>
            <Heading fontSize={"2xl"}>{userProfile.user.name}</Heading>
            <Text color={"gray.600"}>@{userProfile.user.username}</Text>
          </VStack>
          <Text>{userProfile.bio}</Text>
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
            <FollowersInCommonText userProfile={userProfile} />
          </ChakraLink>
        </VStack>
      </VStack>
    </VStack>
  );
};
