import { DraggableAttributes, useDraggable } from "@dnd-kit/core";
import { CSSProperties } from "react";
import { Transform } from "../types";

export const PanelWrapper = ({
  id,
  styles,
  attributes,
  setNodeRef,
  transform,
  children,
}: {
  id: string;
  styles: CSSProperties;
  attributes: DraggableAttributes;
  setNodeRef: (element: HTMLElement | null) => void;
  transform: Transform | null;
  children: React.ReactNode;
}) => {
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...styles }}
      {...attributes}
      className="max-w-sm min-h-96 absolute top-0 left-0"
    >
      {children}
    </div>
  );
};
