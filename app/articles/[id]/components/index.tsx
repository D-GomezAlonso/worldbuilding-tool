import { ProjectFormType } from "@/form-utils";
import { Input, Textarea } from "@nextui-org/input";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, $getSelection, EditorState, LexicalEditor } from "lexical";
import { ToolbarPlugin } from "./RichTextEditor/ToolbarPlugin";

export const RichTextEditor = () => {
  const theme = {};

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
    theme,
    onError,
  };

  return (
    <div className="h-full border border-divider rounded-[14]  bg-foreground-100 flex flex-col">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container h-full flex flex-col ">
          <ToolbarPlugin />
          <div className="editor-inner flex-1 p-2">
            <RichTextPlugin
              contentEditable={<ContentEditable className="h-full outline-none" />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={onChange} />
            <HistoryPlugin />
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};
