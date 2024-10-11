"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ProjectFormType } from "@/form-utils";
import texture from "../../../../public/paper.jpg";
import headerDefaultImage from "../../../../public/article-header.jpg";
import { Image } from "@nextui-org/image";

export default function ViewPage({ params }: { params: { id: string } }) {
  const { watch, setValue } = useFormContext<ProjectFormType>();

  const articleIndex = watch("articles").findIndex(
    (value) => value.id === params.id
  );

  return (
    <div className="flex flex-col w-full h-full items-center bg-[#c6c3be] relative overflow-y-scroll">
      <div className="w-3/4 shadow-2xl">
        <header>
          <Image
            src={headerDefaultImage.src}
            alt="header image"
            classNames={{
              img: "bg-cover min-wfull w-full max-h-72 object-cover rounded-none",
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
              Where the roses fade
            </h3>
          </div>

          <div className="flex w-full gap-16">
            <section className="flex flex-col gap-6 text-[#350006] w-2/3">
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32.
              </p>
              <p>
                The standard chunk of Lorem Ipsum used since the 1500s is
                reproduced below for those interested. Sections 1.10.32 and
                1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                reproduced in their exact original form, accompanied by English
                versions from the 1914 translation by H. Rackham. Where can I
                get some?
              </p>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary,
                making this the first true generator on the Internet. It uses a
                dictionary of over 200 Latin words, combined with a handful of
                model sentence structures, to generate Lorem Ipsum which looks
                reasonable. The generated Lorem Ipsum is therefore always free
                from repetition, injected humour, or non-characteristic words
                etc. paragraphs words bytes lists Start with 'Lorem ipsum dolor
                sit amet...'
              </p>
              <p>
                Donate: If you use this site regularly and would like to help
                keep the site on the Internet, please consider donating a small
                sum to help pay for the hosting and bandwidth bill. There is no
                minimum donation, any sum is appreciated - click here to donate
                using PayPal. Thank you for your support. Donate bitcoin:
                16UQLq1HZ3CNwhvgrarV6pMoA2CDjb4tyF Translations: Can you help
                translate this site into a foreign language ? Please email us
                with details if you can help. There is a set of mock banners
                available here in three colours and in a range of standard
                banner sizes: BannersBannersBanners NodeJS Python Interface GTK
                Lipsum Rails .NET AD The standard Lorem Ipsum passage, used
                since the 1500s
              </p>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
                Section 1.10.32 of "de Finibus Bonorum et Malorum", written by
                Cicero in 45 BC
              </p>
              <p>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?"
              </p>
            </section>
            <section className="w-1/3 text-[#350006]">
              <p className="p-3">What is lorem ipsum?</p>
              <div className="shadow p-3 rounded-2xl flex flex-col bg-[#eae4d2]">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum. Why do
                  we use it?
                </p>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like). aaaaaaaaaaaaaaaaaa
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
