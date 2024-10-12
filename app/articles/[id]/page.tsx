"use client";
import { Divider } from "@nextui-org/divider";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ProjectFormType } from "@/form-utils";
import { Input } from "@nextui-org/input";
import { RichTextEditor } from "./components/RichTextEditor";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export type Fields =
  | "content"
  | "subheading"
  | "credits"
  | "sidebarTop"
  | "sidebarTopContent"
  | "sidebarBottom"
  | "sidebarBottomContent"
  | "footnotes"

export default function ArticlesPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { watch, setValue } = useFormContext<ProjectFormType>();

  const articleIndex = watch("articles").findIndex(
    (value) => value.id === params.id
  );

  const onChange = (field: Fields | "name", value: string) => {
    if (articleIndex !== -1) {
      setValue(`articles.${articleIndex}.${field}`, value);
    }
  };

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
            onChange={(e) => onChange("name", e.currentTarget.value)}
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
              <RichTextEditor updateFieldValue={onChange} fieldName="content" />
            </Tab>
            <Tab title="Header" className="flex-1">
              <div className="flex flex-col gap-6 ">
                <Input
                  variant="underlined"
                  placeholder="Write your subheading"
                  label="SUBHEADING"
                  classNames={{ label: "text-lg font-bold" }}
                  value={watch(`articles.${articleIndex}.subheading`) ?? ""}
                  onChange={(e) =>
                    onChange("subheading", e.currentTarget.value)
                  }
                />
                <EditorWithLabel
                  label="CREDITS"
                  updateFieldValue={onChange}
                  fieldName="credits"
                />
              </div>
            </Tab>
            <Tab title="Sidebar">
              <div className="flex-1 flex flex-col gap-6 py-5">
                <EditorWithLabel
                  updateFieldValue={onChange}
                  fieldName="sidebarTop"
                  label="SIDEBAR: TOP"
                />
                <EditorWithLabel
                  updateFieldValue={onChange}
                  fieldName="sidebarTopContent"
                  label="SIDEBAR: CONTENT PANEL TOP"
                />
                <EditorWithLabel
                  updateFieldValue={onChange}
                  fieldName="sidebarBottom"
                  label="SIDEBAR: BOTTOM"
                />
                <EditorWithLabel
                  updateFieldValue={onChange}
                  fieldName="sidebarBottomContent"
                  label="SIDEBAR: CONTENT PANEL BOTTOM"
                />
              </div>
            </Tab>
            <Tab title="Footer" className="flex-1">
              <div className="flex-1 flex flex-col gap-6 py-5">
                <EditorWithLabel
                  fieldName="footnotes"
                  updateFieldValue={onChange}
                  label="FOOTNOTES"
                />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

const EditorWithLabel = ({
  label,
  updateFieldValue,
  fieldName,
}: {
  label: string;
  updateFieldValue: (field: Fields, value: string) => void;
  fieldName: Fields;
}) => {
  return (
    <div className="h-72 flex flex-col ">
      <h1 className="ml-1.5 text-fieldHeader font-bold mb-2 text-default-600">
        {label}
      </h1>
      <div className="flex-1">
        <RichTextEditor
          updateFieldValue={updateFieldValue}
          fieldName={fieldName}
        />
      </div>
    </div>
  );
};
