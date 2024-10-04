"use client";
import { Divider } from "@nextui-org/divider";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ProjectFormType } from "@/form-utils";
import { Input, Textarea } from "@nextui-org/input";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, $getSelection, EditorState, LexicalEditor } from "lexical";
import { RichTextEditor } from "./components";

export default function ArticlesPage({ params }: { params: { id: string } }) {
  const { watch, setValue } = useFormContext<ProjectFormType>();

  const articleIndex = watch("articles").findIndex(
    (value) => value.id === params.id
  );

  return (
    <div className="flex flex-col w-full h-full">
      <Divider></Divider>

      <div className="w-full h-full p-5 relative overflow-hidden flex flex-col gap-5 dark:bg-gray-background">
        <Input />
        <RichTextEditor />
      </div>
    </div>
  );
}
