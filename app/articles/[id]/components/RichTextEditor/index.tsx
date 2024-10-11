import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import {
  $getRoot,
  $getSelection,
  EditorState,
  LexicalEditor,
  ParagraphNode,
} from "lexical";
import { ToolbarPlugin } from "./ToolbarPlugin";
import ExampleTheme from "./ExampleTheme";
import "./styles.css";
import { HeadingNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { Fields } from "../../page";

type RichTextEditorProps = {
  updateFieldValue: (field: Fields, value: string) => void;
  fieldName: Fields;
};

export const RichTextEditor = ({
  updateFieldValue,
  fieldName,
}: RichTextEditorProps) => {
  function onChange(
    editorState: EditorState,
    editor: LexicalEditor,
    tags: Set<string>
  ) {
    editorState.read(() => {
      const root = $getRoot();
      updateFieldValue(fieldName, root.getTextContent());
    });
  }

  function onError(error: Error) {
    console.error(error);
  }

  const initialConfig = {
    namespace: "MyEditor",
    nodes: [HeadingNode, ListNode, ListItemNode, ParagraphNode],
    theme: ExampleTheme,
    onError,
  };

  return (
    <div className="h-full border border-divider rounded-[14]  bg-foreground-100 flex flex-col">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container h-full flex flex-col ">
          <ToolbarPlugin />
          <div className="editor-inner flex-1 p-2">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="editor-input h-full outline-none" />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={onChange} />
            <HistoryPlugin />
            <ListPlugin />
            <AutoFocusPlugin />
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};
