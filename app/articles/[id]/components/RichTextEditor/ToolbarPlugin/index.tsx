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
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const LowPriority = 1;

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

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
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
        <AlignDropdown editor={editor}/>
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
          <BsTextLeft className={iconStyle} />
          Left Align
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
        <DropdownItem startContent={<BsListOl className={iconStyle} />}>
          Ordered List
        </DropdownItem>
        <DropdownItem startContent={<BsListUl className={iconStyle} />}>
          Bullet List
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
