import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  Text,
  VStack,
  forwardRef,
} from "@chakra-ui/react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { searchServiceFactory } from "../../services/httpServiceFactories";
import { IUserProfile } from "../../types/User";

interface Props {
  isOpen: boolean;
  mentionSpanRef: React.MutableRefObject<HTMLSpanElement | null>;
  onClose: () => void;
}

export const MentionSuggestionsBox = forwardRef(
  ({ isOpen, mentionSpanRef, onClose }: Props, ref) => {
    const httpService = searchServiceFactory("users");
    const { data, isLoading } = useInfiniteScroll<IUserProfile>(
      httpService,
      mentionSpanRef.current
        ? { q: mentionSpanRef.current.textContent?.substring(1) }
        : {},
      [mentionSpanRef?.current?.textContent]
    );

    return (
      <Box zIndex={1} ref={ref} position={"fixed"}>
        <Menu isOpen={isOpen}>
          <MenuButton></MenuButton>
          <MenuList as={VStack} bg={"black"} align={"stretch"} spacing={0}>
            {isLoading ? (
              <Spinner alignSelf={"center"} />
            ) : (
              data.map((userProfile) => (
                <HStack
                  as={Button}
                  p={7}
                  bg={"black"}
                  borderRadius={0}
                  justifyContent={"flex-start"}
                  onClick={() => {
                    if (!mentionSpanRef.current) return;
                    mentionSpanRef.current.textContent = `@${userProfile.user.username}`;
                    onClose();
                  }}
                >
                  <Avatar src={userProfile.avatar} />
                  <VStack spacing={0}>
                    <Heading alignSelf={"flex-start"} size={"sm"}>
                      {userProfile.user.name}
                    </Heading>
                    <Text alignSelf={"flex-start"} color="gray.600">
                      @{userProfile.user.username}
                    </Text>
                  </VStack>
                </HStack>
              ))
            )}
          </MenuList>
        </Menu>
      </Box>
    );
  }
);
