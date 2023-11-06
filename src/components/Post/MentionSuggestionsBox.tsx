import {
  Avatar,
  Box,
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
          <MenuList p={3} as={VStack} alignItems={"flex-start"}>
            {isLoading ? (
              <Spinner alignSelf={"center"} />
            ) : (
              data.map((userProfile) => (
                // <MenuItem>
                <HStack
                  py={1}
                  justifyContent={"flex-start"}
                  onClick={() => {
                    console.log("cliucked");

                    if (mentionSpanRef.current) {
                      console.log(
                        "inside mention span if",
                        mentionSpanRef.current.parentElement
                      );

                      mentionSpanRef.current.textContent = `@${userProfile.user.username}`;
                      onClose();
                    }
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
                // </MenuItem>
              ))
            )}
          </MenuList>
        </Menu>
      </Box>
    );
  }
);
