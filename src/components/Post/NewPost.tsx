import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";

import { BsChevronDown, BsFillImageFill } from "react-icons/bs";
import TextareaAutoResize from "react-textarea-autosize";
import { userPostsServiceFactory } from "../../services/httpServiceFactories";
import useAuth from "../../hooks/useAuth";
import IPost from "../../types/Post";
import usePosts from "../../hooks/usePosts";

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

interface PostReply {
  text: string;
  reply_to?: number;
}

export const NewPost = ({ reply_post }: Props) => {
  const [postLength, setPostLength] = useState(0);
  const [postText, setPostText] = useState("");
  const { auth } = useAuth();
  const userService = userPostsServiceFactory(auth.username);
  const { posts, setPosts } = usePosts();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);
  const imageStackRef = useRef<HTMLDivElement>(null);
  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { request } = userService.create<PostReply, IPost>({
      text: postText,
      ...(reply_post && { reply_to: reply_post.id }),
    });
    request
      .then((resp) => {
        if (posts && setPosts)
          setPosts(
            [resp.data, ...posts].map((p) =>
              p.id !== reply_post?.id
                ? p
                : {
                    ...reply_post,
                    replies_count: reply_post?.replies_count + 1,
                  }
            )
          );
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
            <VStack ref={imageStackRef} alignSelf={"center"} display={"none"}>
              <Button
                borderRadius={30}
                top={12}
                alignSelf={"flex-end"}
                variant={"ghost"}
                onClick={() => {
                  if (
                    imageInputRef.current &&
                    previewImageRef.current &&
                    imageStackRef.current
                  ) {
                    imageInputRef.current.value = "";
                    previewImageRef.current.src = "";
                    imageStackRef.current.style.display = "none";
                  }
                }}
              >
                X
              </Button>
              <Image
                alignSelf={"center"}
                objectFit={"cover"}
                maxW={"50vw"}
                maxH={"50vh"}
                ref={previewImageRef}
              />
            </VStack>
            <FormControl>
              <Input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                display={"none"}
                onChange={(ev) => {
                  if (
                    ev.target.files?.length &&
                    previewImageRef.current &&
                    imageStackRef.current
                  ) {
                    previewImageRef.current.src = URL.createObjectURL(
                      ev.target.files[0]
                    );
                    imageStackRef.current.style.display = "flex";
                  }
                }}
              />
              <HStack>
                <IconButton
                  aria-label="upload picture"
                  borderRadius={30}
                  variant={"ghost"}
                  icon={<BsFillImageFill />}
                  onClick={() => imageInputRef.current?.click()}
                />
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
