import { ImagePanel } from "@/app/characters/[id]/components/ImagePanel";

export const formDefaultValues: ProjectFormType = {
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
};

export type ProjectFormType = {
  characters: Character[];
};

export type Character = {
  name: string;
  id: string;
  panels: (ListPanel | TextPanel | ImagePanel)[];
};

export interface Panel {
  id: string;
  position: { x: number; y: number };
}

export interface ListPanel extends Panel {
  entries: PanelEntry[];
}

export interface TextPanel extends Panel {
  text: string;
}

export interface ImagePanel extends Panel {
  image: string;
}

export type PanelEntry = {
  title: string;
  description: string;
  id: string;
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

export type AnyPanel = ListPanel | TextPanel | ImagePanel;

export const isListPanel = (panel: AnyPanel): panel is ListPanel => {
  return (panel as ListPanel).entries !== undefined;
};

export const isTextPanel = (panel: AnyPanel): panel is TextPanel => {
  return (panel as TextPanel).text !== undefined;
};

export const isImagePanel = (panel: AnyPanel): panel is ImagePanel => {
  return (panel as ImagePanel).image !== undefined;
};
