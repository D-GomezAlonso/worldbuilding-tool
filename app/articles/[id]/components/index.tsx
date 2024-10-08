import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, $getSelection, EditorState, LexicalEditor } from "lexical";
import { ToolbarPlugin } from "./RichTextEditor/ToolbarPlugin";
import ExampleTheme from "./RichTextEditor/ExampleTheme";
import "./styles.css";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

const placeholder = "Enter some rich text...";

export const RichTextEditor = () => {
  function onChange(
    editorState: EditorState,
    editor: LexicalEditor,
    tags: Set<string>
  ) {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();

      console.log(root, selection);
    });
  }

  function onError(error: Error) {
    console.error(error);
  }

  const initialConfig = {
    namespace: "MyEditor",
    nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode],
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
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};
