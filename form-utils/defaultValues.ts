import { uuid } from "uuidv4";
import {
  AnyPanel,
  ImagePanel,
  ListPanel,
  ProjectFormType,
  TextPanel,
} from "./types";

export const formDefaultValues: ProjectFormType = {
  name: "New Project",
  characters: [
    {
      name: "Character 1",
      id: "1",
      panels: [
        {
          id: "1",
          position: { x: 0, y: 0 },
          entries: [
            {
              title: "",
              description: "",
              id: "1",
            },
          ],
        },
      ],
    },
  ],
  places: [],
  blogs: [],
};

export const createCharacter = (name: string, id: string) => ({
  name,
  id,
  panels: [
    {
      id: "1",
      position: { x: 0, y: 0 },
      entries: [
        {
          title: "",
          description: "",
          id: "1",
        },
      ],
    },
  ],
});

export const isListPanel = (panel: AnyPanel): panel is ListPanel => {
  return (panel as ListPanel).entries !== undefined;
};

export const isTextPanel = (panel: AnyPanel): panel is TextPanel => {
  return (panel as TextPanel).text !== undefined;
};

export const isImagePanel = (panel: AnyPanel): panel is ImagePanel => {
  return (panel as ImagePanel).image !== undefined;
};

export const createListPanel = (): ListPanel => {
  return {
    id: uuid(),
    position: { x: 0, y: 0 },
    entries: [{ title: "", description: "", id: uuid() }],
  };
};

export const createTextPanel = (): TextPanel => {
  return {
    id: uuid(),
    position: { x: 0, y: 0 },
    text: "",
  };
};

export const createImagePanel = (): ImagePanel => {
  return {
    id: uuid(),
    position: { x: 0, y: 0 },
    image: "",
  };
};

export const createNewPanel = (
  panelType: "list" | "text" | "image"
): AnyPanel => {
  switch (panelType) {
    case "list":
      return createListPanel();
    case "text":
      return createTextPanel();
    case "image":
      return createImagePanel();
  }
};
