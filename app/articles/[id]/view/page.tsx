"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ProjectFormType } from "@/form-utils";
import texture from "../../../../public/paper.jpg";
import headerDefaultImage from "../../../../public/article-header.jpg";
import { Image } from "@nextui-org/image";
import parse from "html-react-parser";
import { Button } from "@nextui-org/button";
import { BsPencilSquare } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Divider } from "@nextui-org/divider";

export default function ViewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { watch } = useFormContext<ProjectFormType>();

  const articleIndex = watch("articles").findIndex(
    (value) => value.id === params.id
  );

  return (
    <div className="flex flex-col w-full h-full items-center bg-[#c6c3be] relative overflow-y-scroll">
      <div className="w-3/4 shadow-2xl">
        <header className="relative">
          <Button
            className="absolute z-10 bottom-0 left-0 bg-opacity-50 rounded-none"
            variant="shadow"
            startContent={<BsPencilSquare />}
            onClick={() => router.push(`/articles/${params.id}`)}
          >
            Edit
          </Button>
          <Image
            src={headerDefaultImage.src}
            alt="header image"
            classNames={{
              img: "bg-cover min-wfull w-full max-h-72 object-cover rounded-none z-0",
              wrapper: "min-w-full w-full",
            }}
          />
        </header>
        <article
          className={`flex flex-col flex-1 relative px-7 py-12  gap-14 `}
          style={{ backgroundImage: `url(${texture.src})` }}
        >
          <header className="flex flex-col gap-3">
            <h1 className="text-3xl font-serif font-bold text-article-red">
              {watch(`articles.${articleIndex}.name`)}
            </h1>
            <h3 className="text-xl font-serif text-article-red">
              {watch(`articles.${articleIndex}.subheading`)}
            </h3>
          </header>

          <div className="flex w-full gap-16">
            <div className="flex flex-col text-article-red w-2/3 gap-3">
              <main>
                {parse(watch(`articles.${articleIndex}.content`) ?? "")}
              </main>

              <Divider orientation="horizontal" className="bg-article-red" />
              <footer>
                <h1 className="font-serif font-bold  text-article-red">
                  Notes
                </h1>
                {parse(watch(`articles.${articleIndex}.footnotes`) ?? "")}
              </footer>
            </div>
            <section className="w-1/3 text-article-red flex flex-col gap-6">
              <SideArticle
                title={watch(`articles.${articleIndex}.sidebarTop`) ?? ""}
                content={
                  watch(`articles.${articleIndex}.sidebarTopContent`) ?? ""
                }
              />
              <SideArticle
                title={watch(`articles.${articleIndex}.sidebarBottom`) ?? ""}
                content={
                  watch(`articles.${articleIndex}.sidebarBottomContent`) ?? ""
                }
              />
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}

const SideArticle = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const hasTitleAndContent = title && content;

  if (!hasTitleAndContent) return null;

  return (
    <article>
      <p className="p-3">{parse(title)}</p>
      <div className="shadow p-3 rounded-2xl flex flex-col bg-[#eae4d2]">
        {parse(content)}
      </div>
    </article>
  );
};
