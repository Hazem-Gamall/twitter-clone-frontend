import {
  Avatar,
  Button,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import { UserProfile } from "../types/User";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineNotificationAdd } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { BsCalendar3 } from "react-icons/bs";
import formatDate from "../../../utils/formatDate";
import { Link } from "react-router-dom";

interface Props {
  userProfile: UserProfile;
}

export const UserDetail = ({ userProfile }: Props) => {
  return (
    <VStack align={"stretch"}>
      <Image
        overflow={"clip"}
        // width={"sm"}
        src="https://pbs.twimg.com/profile_banners/1434937735089958914/1673200466/1500x500"
      />
      <VStack align={"stretch"} mx={3}>
        <HStack justifyContent={"flex-end"}>
          <Avatar
            name={userProfile.user.name}
            src="https://pbs.twimg.com/profile_images/1528400499527008256/hsUTV88y_400x400.jpg"
            position={"absolute"}
            border={"4px"}
            color={"black"}
            left={300}
            top={230}
            boxSize={130}
          />
          <IconButton
            aria-label="more"
            icon={<FiMoreHorizontal />}
            borderRadius={30}
            fontSize={"xl"}
            variant={"outline"}
          />

          <IconButton
            aria-label="messages"
            icon={<FiMail />}
            borderRadius={30}
            fontSize={"xl"}
            variant={"outline"}
          />

          <IconButton
            aria-label="more"
            icon={<MdOutlineNotificationAdd />}
            borderRadius={30}
            fontSize={"xl"}
            variant={"outline"}
          />
          <Button variant={"outline"} borderRadius={30}>
            Following
          </Button>
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
