import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { MutableRefObject, useRef } from "react";
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
  $createParagraphNode,
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
import {
  $createHeadingNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";

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

  const formatList = useCallback(
    (listType: "ul" | "ol") => {
      if (blockType !== listType) {
        const command =
          listType === "ol"
            ? INSERT_ORDERED_LIST_COMMAND
            : INSERT_UNORDERED_LIST_COMMAND;
        editor.dispatchCommand(command, undefined);
      } else {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      }
    },
    [editor, blockType]
  );

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
        <TextTypeDropdown editor={editor} blockType={blockType} />
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
          onClick={() => formatList("ol")}
        >
          Ordered List
        </Button>
        <Button
          variant="light"
          startContent={<BsListUl className={iconStyle} />}
          onClick={() => formatList("ul")}
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
  const alignCommand = (alignment: "right" | "left" | "center" | "justify") =>
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);

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
          onClick={() => alignCommand("left")}
          startContent={<BsTextLeft className={iconStyle} />}
        >
          Left Align
        </DropdownItem>
        <DropdownItem
          onClick={() => alignCommand("center")}
          startContent={<BsTextCenter className={iconStyle} />}
        >
          Center Align
        </DropdownItem>
        <DropdownItem
          onClick={() => alignCommand("right")}
          startContent={<BsTextRight className={iconStyle} />}
        >
          Right Align
        </DropdownItem>
        <DropdownItem
          onClick={() => alignCommand("justify")}
          startContent={<BsJustify className={iconStyle} />}
        >
          Justify
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const TextTypeDropdown = ({
  editor,
  blockType,
}: {
  editor: LexicalEditor;
  blockType: string;
}) => {
  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeader = (headingTag: HeadingTagType) => {
    if (blockType !== headingTag) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingTag));
        }
      });
    }
  };

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
        <DropdownItem
          onClick={formatParagraph}
          startContent={<BsType className={iconStyle} />}
        >
          Normal
        </DropdownItem>
        <DropdownItem
          onClick={() => formatHeader("h1")}
          startContent={<BsTypeH1 className={iconStyle} />}
        >
          Heading 1
        </DropdownItem>
        <DropdownItem
          onClick={() => formatHeader("h2")}
          startContent={<BsTypeH2 className={iconStyle} />}
        >
          Heading 2
        </DropdownItem>
        <DropdownItem
          onClick={() => formatHeader("h3")}
          startContent={<BsTypeH3 className={iconStyle} />}
        >
          Heading 3
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
