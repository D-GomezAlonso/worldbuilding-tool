import { title } from "@/components/primitives";

export default function PlacesPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className={title()}>Places</h1>
    </div>
  );
}
