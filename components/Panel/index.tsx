import {
  isImagePanel,
  isListPanel,
  isTextPanel,
} from "@/form-utils/defaultValues";
import { CSSProperties } from "react";
import { useFormContext } from "react-hook-form";
import { TextPanel } from "./TextPanel";
import { ListPanel } from "./ListPanel";
import { ImagePanel } from "./ImagePanel";
import { FormKeys } from "./types";

type PanelProps = {
  id: string;
  fieldName: `${FormKeys}.${number}.panels.${number}`;
  styles: CSSProperties;
};

export const Panel = ({ id, fieldName, styles }: PanelProps) => {
  const { watch } = useFormContext();
  const formField = watch(fieldName);

  const props = { id, fieldName, styles };

  return (
    <>
      {isListPanel(formField) && <ListPanel {...props} />}
      {isTextPanel(formField) && <TextPanel {...props} />}
      {isImagePanel(formField) && <ImagePanel {...props} />}
    </>
  );
};
