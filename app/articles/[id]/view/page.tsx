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
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-serif font-bold text-[#350006]">
              {watch(`articles.${articleIndex}.name`)}
            </h1>
            <h3 className="text-xl font-serif text-[#350006]">
              {watch(`articles.${articleIndex}.subheading`)}
            </h3>
          </div>

          <div className="flex w-full gap-16">
            <section className="flex flex-col text-[#350006] w-2/3 gap-0">
              {parse(watch(`articles.${articleIndex}.content`) ?? "")}
            </section>
            <section className="w-1/3 text-[#350006] flex flex-col gap-6">
              <div>
                <p className="p-3">
                  {parse(watch(`articles.${articleIndex}.sidebarTop`) ?? "")}
                </p>
                <div className="shadow p-3 rounded-2xl flex flex-col bg-[#eae4d2]">
                  {parse(
                    watch(`articles.${articleIndex}.sidebarTopContent`) ?? ""
                  )}
                </div>
              </div>
              <div>
                <p className="p-3">
                  {parse(watch(`articles.${articleIndex}.sidebarBottom`) ?? "")}
                </p>
                <div className="shadow p-3 rounded-2xl flex flex-col bg-[#eae4d2]">
                  {parse(
                    watch(`articles.${articleIndex}.sidebarBottomContent`) ?? ""
                  )}
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
