import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { useMemo, useRef } from 'react';
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
} from 'react-icons/bs';
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils';
import {
  $createParagraphNode,
  $getSelection,
  $isElementNode,
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
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import {
  $createHeadingNode,
  $isHeadingNode,
  HeadingTagType,
} from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { getSelectedNode } from '../../RichTextEditor/utils/getSelectedNodes';

const LowPriority = 1;

const supportedBlockTypes = new Set([
  'paragraph',
  'quote',
  'code',
  'h1',
  'h2',
  'ul',
  'ol',
]);

type BlockTypes = 'paragraph' | 'h1' | 'h2' | 'h3';

const blockTypeToBlockName = {
  paragraph: { label: 'Normal', icon: BsType },
  h1: { label: 'Large Heading', icon: BsTypeH1 },
  h2: { label: 'Small Heading', icon: BsTypeH2 },
  h3: { label: 'Heading', icon: BsTypeH3 },
};

type LimitedAlignment = 'right' | 'left' | 'center' | 'justify';

const alignmentTypeToAlignName = {
  left: { label: 'Left Align', icon: BsTextLeft },
  center: { label: 'Center Align', icon: BsTextCenter },
  right: { label: 'Right Align', icon: BsTextRight },
  justify: { label: 'Justify Align', icon: BsJustify },
};

const iconStyle = 'h-4 w-4';

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState<string>();
  const [elementFormat, setElementFormat] = useState<ElementFormatType>('left');

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
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

      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));

      const node = getSelectedNode(selection);
      const parent = node.getParent();

      let matchingParent;
      if ($isListNode(parent)) {
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline(),
        );
      }

      setElementFormat(
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
            ? node.getFormatType()
            : parent?.getFormatType() || 'left',
      );
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
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  const formatList = useCallback(
    (listType: 'ul' | 'ol') => {
      if (blockType !== listType) {
        const command =
          listType === 'ol'
            ? INSERT_ORDERED_LIST_COMMAND
            : INSERT_UNORDERED_LIST_COMMAND;
        editor.dispatchCommand(command, undefined);
      } else {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      }
    },
    [editor, blockType],
  );

  return (
    <div>
      <div className="flex flex-row items-center gap-1">
        <Button
          variant="light"
          isIconOnly
          onPress={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
        >
          <BsArrowCounterclockwise className={iconStyle} />
        </Button>
        <Button
          variant="light"
          isIconOnly
          onPress={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
        >
          <BsArrowClockwise className={iconStyle} />
        </Button>
        <Divider orientation="vertical" className="h-8 max-h-8" />
        <TextTypeDropdown editor={editor} blockType={blockType as BlockTypes} />
        <Divider orientation="vertical" className="h-8 max-h-8" />
        <Button
          variant="light"
          isIconOnly
          onPress={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          }}
        >
          <BsTypeBold className={iconStyle} />
        </Button>
        <Button
          variant="light"
          isIconOnly
          onPress={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
          }}
        >
          <BsTypeItalic className={iconStyle} />
        </Button>
        <Button
          variant="light"
          isIconOnly
          onPress={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
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
          onPress={() => formatList('ol')}
        >
          Ordered List
        </Button>
        <Button
          variant="light"
          startContent={<BsListUl className={iconStyle} />}
          onPress={() => formatList('ul')}
        >
          Bullet List
        </Button>
        <Divider orientation="vertical" className="h-8 max-h-8" />
        <AlignDropdown
          editor={editor}
          elementFormat={elementFormat as LimitedAlignment}
        />
      </div>
      <Divider />
    </div>
  );
};

type Alignments = 'right' | 'left' | 'center' | 'justify';

const AlignDropdown = ({
  editor,
  elementFormat,
}: {
  editor: LexicalEditor;
  elementFormat: Alignments;
}) => {
  const [blockTypeData, setBlockTypeData] = useState(
    alignmentTypeToAlignName.left,
  );
  const alignCommand = (alignment: Alignments) =>
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);

  useEffect(() => {
    const validTypes = ['right', 'left', 'center', 'justify'];
    if (validTypes.includes(elementFormat)) {
      setBlockTypeData(alignmentTypeToAlignName[elementFormat]);
    }
  }, [elementFormat]);

  return (
    <Dropdown className="dark">
      <DropdownTrigger>
        <Button variant="light" className="flex items-center">
          <blockTypeData.icon className={iconStyle} />
          {blockTypeData.label}
          <BsChevronDown className={iconStyle} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key) => alignCommand(key as Alignments)}
      >
        <DropdownItem
          key="left"
          startContent={<BsTextLeft className={iconStyle} />}
        >
          Left Align
        </DropdownItem>
        <DropdownItem
          key="center"
          startContent={<BsTextCenter className={iconStyle} />}
        >
          Center Align
        </DropdownItem>
        <DropdownItem
          key="right"
          startContent={<BsTextRight className={iconStyle} />}
        >
          Right Align
        </DropdownItem>
        <DropdownItem
          key="justify"
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
  blockType: 'h1' | 'h2' | 'h3' | 'paragraph';
}) => {
  const [blockTypeData, setBlockTypeData] = useState(
    blockTypeToBlockName.paragraph,
  );

  useEffect(() => {
    const validTypes = ['h1', 'h2', 'h3', 'paragraph'];
    if (validTypes.includes(blockType)) {
      setBlockTypeData(blockTypeToBlockName[blockType]);
    }
  }, [blockType]);

  const formatHeader = (headingTag: HeadingTagType | 'p') => {
    if (headingTag === 'p') {
      if (blockType !== 'paragraph') {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createParagraphNode());
          }
        });
      }
    } else {
      if (blockType !== headingTag) {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode(headingTag));
          }
        });
      }
    }
  };

  return (
    <Dropdown className="dark">
      <DropdownTrigger>
        <Button variant="light" className="flex items-center">
          <blockTypeData.icon className={iconStyle} />
          {blockTypeData.label}
          <BsChevronDown className={iconStyle} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key) => formatHeader(key as HeadingTagType | 'p')}
      >
        <DropdownItem key="p" startContent={<BsType className={iconStyle} />}>
          Normal
        </DropdownItem>
        <DropdownItem
          key="h1"
          startContent={<BsTypeH1 className={iconStyle} />}
        >
          Heading 1
        </DropdownItem>
        <DropdownItem
          key="h2"
          startContent={<BsTypeH2 className={iconStyle} />}
        >
          Heading 2
        </DropdownItem>
        <DropdownItem
          key="h3"
          startContent={<BsTypeH3 className={iconStyle} />}
        >
          Heading 3
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
