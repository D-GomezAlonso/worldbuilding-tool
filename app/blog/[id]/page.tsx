import { title } from "@/components/primitives";

export default function BlogPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className={title()}>Blog</h1>
    </div>
  );
}
