import {
  Avatar,
  Button,
  Divider,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { BsChevronDown } from "react-icons/bs";
import TextareaAutoResize from "react-textarea-autosize";

const PrivacyMenu = () => {
  return (
    <Menu>
      <MenuButton
        rightIcon={<BsChevronDown />}
        borderRadius={30}
        as={Button}
        color={"blue.400"}
        variant={"outline"}
        fontSize={"sm"}
        size={"sm"}
      >
        Everyone
      </MenuButton>
      <MenuList>
        <MenuItem>Everyone</MenuItem>
        <MenuItem>Circle</MenuItem>
      </MenuList>
    </Menu>
  );
};

export const NewPost = () => {
  return (
    <form>
      <VStack alignItems={"flex-end"}>
        <HStack>
          <Avatar name="test" />
          <VStack alignItems={"start"}>
            <PrivacyMenu />
            <Textarea
              placeholder="What is happening?!"
              resize={"none"}
              border={"none"}
              rows={1}
              size={"lg"}
              as={TextareaAutoResize}
              width={"600px"}
            />
          </VStack>
        </HStack>
        <Divider />
        <Button type="submit" borderRadius={30} colorScheme="blue">
          Post
        </Button>
      </VStack>
    </form>
  );
};
