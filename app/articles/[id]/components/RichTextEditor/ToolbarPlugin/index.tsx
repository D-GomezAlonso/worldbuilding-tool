import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRef } from "react";
import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsLink,
  BsTextLeft,
  BsTextCenter,
  BsTextRight,
  BsJustify,
  BsChevronDown,
  BsType,
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsListUl,
  BsListOl,
  BsArrowClockwise,
  BsArrowCounterclockwise,
} from "react-icons/bs";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";

const LowPriority = 1;

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "ul",
  "ol",
]);

const blockTypeToBlockName = {
  code: "Code Block",
  h1: "Large Heading",
  h2: "Small Heading",
  h3: "Heading",
  h4: "Heading",
  h5: "Heading",
  ol: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
  ul: "Bulleted List",
};

const iconStyle = "h-4 w-4";

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState<string>();
  const [elementFormat, setElementFormat] = useState<ElementFormatType>("left");

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        console.log("asdd");
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }

      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  const formatBulletList = useCallback(() => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [editor, blockType]);

  const formatNumberedList = useCallback(() => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [editor, blockType]);

  return (
    <div>
      <div className="flex flex-row items-center gap-1">
        <Button
          variant="light"
          isIconOnly
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
        >
          <BsArrowCounterclockwise className={iconStyle} />
        </Button>
        <Button
          variant="light"
          isIconOnly
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
        >
          <BsArrowClockwise className={iconStyle} />
        </Button>
        <Divider orientation="vertical" className="h-8 max-h-8" />
        <TextTypeDropdown />
        <Divider orientation="vertical" className="h-8 max-h-8" />
        <Button
          variant="light"
          isIconOnly
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
        >
          <BsTypeBold className={iconStyle} />
        </Button>
        <Button
          variant="light"
          isIconOnly
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
        >
          <BsTypeItalic className={iconStyle} />
        </Button>
        <Button
          variant="light"
          isIconOnly
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
        >
          <BsTypeUnderline className={iconStyle} />
        </Button>
        <Button variant="light" isIconOnly>
          <BsLink className={iconStyle} />
        </Button>
        <Divider orientation="vertical" className="h-8 max-h-8" />

        <Button
          variant="light"
          startContent={<BsListOl className={iconStyle} />}
          onClick={formatNumberedList}
        >
          Ordered List
        </Button>
        <Button
          variant="light"
          startContent={<BsListUl className={iconStyle} />}
          onClick={formatBulletList}
        >
          Bullet List
        </Button>
        <Divider orientation="vertical" className="h-8 max-h-8" />
        <AlignDropdown editor={editor} />
      </div>
      <Divider />
    </div>
  );
};

const AlignDropdown = ({ editor }: { editor: LexicalEditor }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" className="flex items-center">
          <BsTextLeft className={iconStyle} />
          Left Align
          <BsChevronDown className={iconStyle} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          startContent={
            <BsTextLeft
              className={iconStyle}
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
              }}
            />
          }
        >
          Left Align
        </DropdownItem>
        <DropdownItem
          startContent={
            <BsTextCenter
              className={iconStyle}
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
              }}
            />
          }
        >
          Center Align
        </DropdownItem>
        <DropdownItem
          startContent={
            <BsTextRight
              className={iconStyle}
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
              }}
            />
          }
        >
          Right Align
        </DropdownItem>
        <DropdownItem
          startContent={
            <BsJustify
              className={iconStyle}
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
              }}
            />
          }
        >
          Justify
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const TextTypeDropdown = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" className="flex items-center">
          <BsType className={iconStyle} />
          Normal
          <BsChevronDown className={iconStyle} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem startContent={<BsType className={iconStyle} />}>
          Normal
        </DropdownItem>
        <DropdownItem startContent={<BsTypeH1 className={iconStyle} />}>
          Heading 1
        </DropdownItem>
        <DropdownItem startContent={<BsTypeH2 className={iconStyle} />}>
          Heading 2
        </DropdownItem>
        <DropdownItem startContent={<BsTypeH3 className={iconStyle} />}>
          Heading 3
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
