import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";

import { BsChevronDown } from "react-icons/bs";
import TextareaAutoResize from "react-textarea-autosize";
import { userPostsServiceFactory } from "../../services/httpServiceFactories";
import useAuth from "../../hooks/useAuth";

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
        {/* <MenuItem>Circle</MenuItem> */}
      </MenuList>
    </Menu>
  );
};

export const NewPost = () => {
  const [postLength, setPostLength] = useState(0);
  const [postText, setPostText] = useState("");
  const { auth } = useAuth();
  const userService = userPostsServiceFactory(auth.username);

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { request } = userService.create({
      text: postText,
    });
    request
      .then((resp) => console.log("post resp", resp))
      .catch((error) => console.log("post error", error));
  };
  return (
    <form onSubmit={handleSubmit}>
      <VStack alignItems={"flex-end"}>
        <HStack>
          <Avatar name="test" />
          <VStack alignItems={"start"}>
            <PrivacyMenu />
            <FormControl>
              <Textarea
                placeholder="What is happening?!"
                resize={"none"}
                border={"none"}
                size={"lg"}
                rows={1}
                as={TextareaAutoResize}
                width={"600px"}
                value={postText}
                onChange={(ev) => {
                  setPostText(ev.target.value);
                  setPostLength(ev.target.value.length);
                }}
              />
              <HStack justifyContent={"flex-end"}>
                <FormLabel
                  color={
                    postLength >= 280
                      ? "red"
                      : postLength >= 260
                      ? "yellow"
                      : ""
                  }
                >
                  {postLength}/280
                </FormLabel>
              </HStack>
            </FormControl>
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
