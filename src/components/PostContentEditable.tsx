import { Box, forwardRef } from "@chakra-ui/react";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Props {
  onChange: (textContent: string) => void;
}

const isTextAfterLastMatch = (trimIndex: number, text: string) =>
  trimIndex < text.length;

const mentionPattern = /(?<=\W|^)(@\w{1,35})/g;

export const PostContentEditable = forwardRef(
  ({ onChange }: Props, ref: any) => {
    const divRef = useRef<HTMLDivElement | null>(null);
    if (ref) ref.current = divRef.current;

    const handleInput = (ev: FormEvent<HTMLDivElement>) => {
      onChange(ev.currentTarget?.textContent || "");
      // console.log(ev.target.selectionStart);
      const text = ev.currentTarget.textContent as string;
      const children = [];
      const matchedStrings = text.matchAll(mentionPattern);
      console.log("event", ev);
      const f = () => console.log("inside span hello");
      if (!mentionPattern.test(text)) return;
      let trimIndex = 0;
      let lastChild = null;
      for (const match of matchedStrings) {
        if (match) {
          const matchIndex = match.index as number;
          const preMatchSpan = document.createElement("span");
          preMatchSpan.textContent = text.substring(trimIndex, matchIndex);
          preMatchSpan.oninput = f;
          const matchSpan = document.createElement("span");
          matchSpan.textContent = match[0];
          matchSpan.style.color = "rgb(29, 155, 240)";
          matchSpan.oninput = f;
          trimIndex = matchIndex + match[0].length;
          children.push(preMatchSpan, matchSpan);

          lastChild = matchSpan;
        }
      }

      if (isTextAfterLastMatch(trimIndex, text)) {
        const span = document.createElement("span");
        span.textContent = text.substring(trimIndex);
        lastChild = span;
        children.push(span);
      }

      if (divRef.current && lastChild) {
        const selection = document.getSelection();
        const offset = selection?.anchorNode;
        console.log("anchorNode before", offset);
        console.log("anchoroffset before", selection?.anchorOffset);
        console.log("selection", selection);

        const range = selection?.getRangeAt(0).cloneRange();

        // range.setStart(selection?.anchorNode, offset);

        console.log("anchorNode after", selection?.anchorNode);
        console.log("anchoroffset after", selection?.anchorOffset);
        console.log("range", range);

        selection?.removeAllRanges();
        selection?.addRange(range);
        divRef.current.replaceChildren(...children);
      }
    };

    return (
      <Box
        ref={divRef}
        contentEditable
        placeholder="What is happening?!"
        wordBreak={"break-word"}
        fontSize={"2xl"}
        outline={"none"}
        onInput={handleInput}
      ></Box>
    );
  }
);
