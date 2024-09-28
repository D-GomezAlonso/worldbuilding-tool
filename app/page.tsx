"use client";
import { Button } from "@nextui-org/button";

export default function Home() {
  // Description text should be changed in future

  return (
    <section className="flex w-full flex-col items-center justify-center gap-5 py-8 bg-home-gradient bg-[length:400%_400%] animate-gradient">
      <h1 className="text-4xl font-bold">World building tool</h1>

      <p className="w-1/2">
        Craft complex characters, intricate cultures, rich histories, that
        breathe life into your story. Whether in fantasy or contemporary
        fiction, create immersive worlds that captivate. Dive deep and watch
        your narrative transform into a vivid tapestry of experiences
      </p>

      <div className="flex gap-5">
        <Button>New Project</Button>
        <Button>Load Project</Button>
      </div>
    </section>
  );
}
