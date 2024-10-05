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
import { Tab, Tabs } from "@nextui-org/tabs";

export default function ArticlesPage({ params }: { params: { id: string } }) {
  const { watch, setValue } = useFormContext<ProjectFormType>();

  const articleIndex = watch("articles").findIndex(
    (value) => value.id === params.id
  );

  return (
    <div className="flex flex-col w-full h-full ">
      <Divider></Divider>

      <div className="w-full h-full p-5 relative  flex flex-col gap-5 dark:bg-gray-background overflow-scroll">
        <Input
          size="lg"
          classNames={{ input: "text-3xl" }}
          placeholder="Article Title"
          variant="underlined"
        />

        <div className="flex flex-col flex-1 bg-gray-navbar px-6 pt-6 text-x">
          <Tabs
            variant="underlined"
            aria-label="Tabs variants"
            className="rounded-[14]"
            classNames={{
              tabList: " border-b-1 w-full pb-0",
              tab: "w-auto !flex-none",
              tabContent: "h-full",
            }}
          >
            <Tab title="Content" className="flex-1 flex flex-col gap-3">
              <RichTextEditor />
            </Tab>
            <Tab title="Header" className="flex-1">
              <div className="flex flex-col gap-6 ">
                <Input
                  variant="underlined"
                  placeholder="Write your subheading"
                  label="SUBHEADING"
                  classNames={{ label: "text-lg font-bold" }}
                />
                <div className="h-56">
                  <label
                    className="ml-1.5 text-base font-bold"
                    style={{
                      transform:
                        "translate(0, calc(calc(50% + .875rem / 2 - 3.5px) * -1)) rotate(0) skewX(0) skewY(0) scaleX(0.85) scaleY(0.85)",
                    }}
                  >
                    CREDITS
                  </label>
                  <RichTextEditor />
                </div>
              </div>
            </Tab>
            <Tab title="Sidebar">
              <div className="flex-1 flex flex-col gap-6 py-5">
                <EditorWithLabel label="SIDEBAR: TOP" />
                <EditorWithLabel label="SIDEBAR: CONTENT PANEL TOP" />
                <EditorWithLabel label="SIDEBAR: BOTTOM" />
                <EditorWithLabel label="SIDEBAR: CONTENT PANEL BOTTOM" />
              </div>
            </Tab>
            <Tab title="Footer" className="flex-1">
              <RichTextEditor />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

const EditorWithLabel = ({ label }: { label: string }) => {
  return (
    <div className="h-72 flex flex-col ">
      <label className="ml-1.5 text-base font-bold">{label}</label>
      <div className="flex-1">
        <RichTextEditor />
      </div>
    </div>
  );
};
