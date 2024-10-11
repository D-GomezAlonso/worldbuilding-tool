"use client";
import { Divider } from "@nextui-org/divider";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ProjectFormType } from "@/form-utils";
import { Input } from "@nextui-org/input";
import { RichTextEditor } from "./components";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function ArticlesPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { watch, setValue } = useFormContext<ProjectFormType>();

  const articleIndex = watch("articles").findIndex(
    (value) => value.id === params.id
  );

  return (
    <div className="flex flex-col w-full h-full ">
      <Divider></Divider>

      <div className="w-full h-full p-5 relative  flex flex-col gap-5 dark:bg-gray-background overflow-scroll">
        <div className="flex gap-10 items-center">
          <Input
            size="lg"
            classNames={{ input: "text-3xl" }}
            placeholder="Article Title"
            variant="underlined"
          />
          <Button onClick={() => router.push(`${params.id}/view`)}>
            Go to View Mode
          </Button>
        </div>
        <div className="flex flex-col flex-1 dark:bg-gray-navbar px-6 pt-6 text-x">
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
                <EditorWithLabel label="CREDITS" />
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
              <div className="flex-1 flex flex-col gap-6 py-5">
                <EditorWithLabel label="FOOTNOTES" />
                <EditorWithLabel label="AUTHOR'S NOTES" />
              </div>
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
      <h1 className="ml-1.5 text-fieldHeader font-bold mb-2">{label}</h1>
      <div className="flex-1">
        <RichTextEditor />
      </div>
    </div>
  );
};
