import { Box, forwardRef, useDisclosure } from "@chakra-ui/react";
import { FormEvent, useRef } from "react";
import "./new-post.css";
import { MentionSuggestionsBox } from "./MentionSuggestionsBox";
import mentionPattern from "../../utils/mentionPattern";
interface Props {
  onChange: (textContent: string) => void;
}

const isTextAfterLastMatch = (trimIndex: number, text: string) =>
  trimIndex < text.length;

const getCaretPosRelativeToDiv = (
  selection: Selection | null,
  ref: React.MutableRefObject<HTMLDivElement | null>
): number => {
  if (!selection || !ref.current) return 0;
  const caretNode = selection.focusNode;
  const caretOffset = selection.focusOffset;

  const parent = ref.current;

  let offsetFromDiv = 0;

  for (let i = 0; i < parent.childNodes.length; i++) {
    let currentTextNode = parent.childNodes[i];
    if (currentTextNode instanceof HTMLSpanElement)
      currentTextNode = currentTextNode.lastChild as ChildNode;
    if (!currentTextNode?.textContent) continue;
    if (caretNode === currentTextNode) {
      offsetFromDiv += caretOffset;
      break;
    }
    offsetFromDiv += currentTextNode.textContent.length;
  }

  return offsetFromDiv;
};

const setCaretPosRelativeToDiv = (
  position: number,
  ref: React.MutableRefObject<HTMLDivElement | null>
) => {
  if (!ref.current) return;
  const parent = ref.current;

  let offsetFromDiv = 0;
  let currentTextNode = null;
  let offsetFromTextNode = 0;
  let breakFromOuterLoop = false;
  for (let i = 0; i < parent.childNodes.length; i++) {
    currentTextNode = parent.childNodes[i].firstChild;
    if (!currentTextNode?.textContent) continue;
    offsetFromTextNode = 0;
    for (let j = 0; j < currentTextNode.textContent.length; j++) {
      offsetFromTextNode = j;
      if (offsetFromDiv >= position) {
        breakFromOuterLoop = true;
        break;
      }
      offsetFromDiv++;
    }
    if (breakFromOuterLoop) break;
  }
  if (!breakFromOuterLoop) offsetFromTextNode++;
  const range = document.createRange();

  range.setStart(currentTextNode as ChildNode, offsetFromTextNode);

  return range;
};

export const PostContentEditable = forwardRef(
  ({ onChange }: Props, ref: any) => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const suggestionsRef = useRef<HTMLDivElement | null>(null);
    const mentionSpanRef = useRef<HTMLSpanElement | null>(null);

    const { isOpen, onClose, onOpen } = useDisclosure();
    if (ref) ref.current = divRef.current;

    const handleInput = (ev: FormEvent<HTMLDivElement>) => {
      onChange(ev.currentTarget?.textContent || "");
      const text = ev.currentTarget.textContent as string;
      const children = [];
      const matchedStrings = text.matchAll(mentionPattern);

      let trimIndex = 0;
      let lastChild = null;
      for (const match of matchedStrings) {
        if (match) {
          const matchIndex = match.index as number;
          const preMatchSpan = document.createElement("span");
          preMatchSpan.textContent = text.substring(trimIndex, matchIndex);
          const matchSpan = document.createElement("span");
          matchSpan.textContent = match[0];
          matchSpan.style.color = "rgb(29, 155, 240)";
          matchSpan.className = "mention";
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
        const offsetFromDiv = getCaretPosRelativeToDiv(selection, divRef);

        divRef.current.replaceChildren(...children);

        const range = setCaretPosRelativeToDiv(offsetFromDiv, divRef);

        selection?.removeAllRanges();
        if (range) selection?.addRange(range);
      }
    };

    const handleSelect = () => {
      const selectedElement =
        document.getSelection()?.anchorNode?.parentElement;

      if (selectedElement?.className !== "mention") {
        onClose();
        return;
      }

      onOpen();

      mentionSpanRef.current = selectedElement;

      if (suggestionsRef.current) {
        suggestionsRef.current.style.top = `${
          selectedElement?.getBoundingClientRect().top
        }px`;
        suggestionsRef.current.style.left = `${
          selectedElement?.getBoundingClientRect().left
        }px`;
      }
    };

    return (
      <>
        <Box
          ref={divRef}
          contentEditable
          //@ts-ignore
          placeholder="What is happening?!"
          wordBreak={"break-word"}
          fontSize={"2xl"}
          outline={"none"}
          onInput={handleInput}
          onSelect={handleSelect}
        ></Box>
        {mentionSpanRef.current?.textContent && (
          <MentionSuggestionsBox
            mentionSpanRef={mentionSpanRef}
            ref={suggestionsRef}
            onMention={() => {}}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
      </>
    );
  }
);
