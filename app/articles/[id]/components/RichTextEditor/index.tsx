import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import {
  $createParagraphNode,
  $getRoot,
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
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { ProjectFormType } from "@/form-utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LoadValuesPlugin } from "./LoadValuesPlugin";

type RichTextEditorProps = {
  updateFieldValue: (field: Fields, value: string) => void;
  fieldName: Fields;
};

export const RichTextEditor = ({
  updateFieldValue,
  fieldName,
}: RichTextEditorProps) => {
  const { watch } = useFormContext<ProjectFormType>();

  function onChange(
    _editorState: EditorState,
    editor: LexicalEditor,
    _tags: Set<string>
  ) {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      updateFieldValue(fieldName, htmlString);
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
            <LoadValuesPlugin fieldName={fieldName} />
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};
