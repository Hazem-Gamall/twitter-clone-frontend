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
        <HStack justifyContent={"flex-end"}>
          <Avatar
            name={userProfile.user.name}
            src={userProfile.avatar}
            position={"absolute"}
            border={"4px"}
            color={"black"}
            left={280}
            top={230}
            boxSize={130}
          />
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

        <VStack ml={1} mt={10} alignItems={"flex-start"}>
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
            <Text color={"gray.600"}>Followed by</Text>
          </ChakraLink>
        </VStack>
      </VStack>
    </VStack>
  );
};
