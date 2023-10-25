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
import IPost from "../../types/Post";
import { useNavigate } from "react-router-dom";

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

interface Props {
  reply_post?: IPost;
}

export const NewPost = ({ reply_post }: Props) => {
  const [postLength, setPostLength] = useState(0);
  const [postText, setPostText] = useState("");
  const { auth } = useAuth();
  const userService = userPostsServiceFactory(auth.username);
  const navigate = useNavigate();

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { request } = userService.create({
      text: postText,
      ...(reply_post && { reply_to: reply_post.id }),
    });
    request
      .then(() => {
        navigate(0);
      })
      .catch((error) => console.log("post error", error));
  };
  return (
    <form onSubmit={handleSubmit}>
      <VStack alignItems={"flex-end"}>
        <HStack width={"100%"} align={"stretch"}>
          <Avatar name="test" />
          <VStack alignItems={"start"} width={"100%"}>
            <PrivacyMenu />
            <FormControl>
              <Textarea
                placeholder="What is happening?!"
                resize={"none"}
                border={"none"}
                size={"lg"}
                rows={1}
                as={TextareaAutoResize}
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
        {reply_post ? (
          <Button type="submit" variant="outline" borderRadius={30}>
            Reply
          </Button>
        ) : (
          <Button type="submit" borderRadius={30} colorScheme="blue">
            Post
          </Button>
        )}
      </VStack>
    </form>
  );
};
