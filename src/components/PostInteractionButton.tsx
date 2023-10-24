import { HStack, IconButton, Text } from "@chakra-ui/react";
import { MouseEvent, useRef } from "react";
import { FaRegComment } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";

interface Props {
  type: "reply" | "repost" | "like" | "share";
  count: number;
}

export const PostInteractionButton = ({ type, count }: Props) => {
  const typeToIconMap = {
    reply: <FaRegComment />,
    repost: <BiRepost />,
    like: <AiOutlineHeart />,
    share: <FiShare />,
  };

  const ref = useRef<HTMLParagraphElement>(null);
  const handleMouseEnter = (ev: MouseEvent<HTMLButtonElement>) => {
    const button = ev.target as HTMLButtonElement;
    button.style.background = "rgba(29,155,240,0.1)";
    button.style.opacity = "0.7";
    button.style.color = "rgba(29,155,240,1)";
    if (ref.current) ref.current.style.color = "rgba(29,155,240,1)";
  };
  const handleMouseLeave = (
    ev: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const button = ev.target as HTMLButtonElement;
    button.style.background = "";
    button.style.opacity = "";
    button.style.color = "";
    if (ref.current) ref.current.style.color = "";
  };
  return (
    <HStack spacing={0}>
      <IconButton
        variant={"ghost"}
        borderRadius={30}
        aria-label="post interaction button"
        icon={typeToIconMap[type]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <Text ref={ref} fontSize={"sm"}>
        {count}
      </Text>
    </HStack>
  );
};
