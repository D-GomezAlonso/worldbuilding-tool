import { ProjectFormType } from "../../../../../form-utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $insertNodes } from "lexical";
import { useFormContext } from "react-hook-form";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { Fields } from "../../..";
import { useEffect } from "react";

export const LoadValuesPlugin = ({
  fieldName,
}: {
  fieldName: `articles.${number}.${Fields}`;
}) => {
  const { watch } = useFormContext<ProjectFormType>();
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const model = watch(fieldName);
    if (editor && model) {
      editor.update(() => {
        const root = $getRoot();
        const content = $generateHtmlFromNodes(editor, null);

        if (!!model && content !== model) {
          root.clear();
          const parser = new DOMParser();
          const dom = parser.parseFromString(model, "text/html");
          const nodes = $generateNodesFromDOM(editor, dom);

          $getRoot().select();
          $insertNodes(nodes);
        }
      });
    }
  }, [watch(fieldName)]);

  return <></>;
};
