import { DraggableAttributes, useDraggable } from "@dnd-kit/core";
import { CSSProperties } from "react";
import { Transform } from "../types";

export const PanelWrapper = ({
  styles,
  attributes,
  setNodeRef,
  transform,
  children,
}: {
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
      className="resize overflow-hidden min-w-80 min-h-96 absolute top-0 left-0 focus-within:z-[2] focus-within:border-1 rounded-[14] border-orange-400"
    >
      {children}
    </div>
  );
};
