import { ImagePanel } from "@/app/characters/[id]/components/ImagePanel";

export const formDefaultValues: ProjectFormType = {
  characters: [
    {
      name: "Character 1",
      id: "1",
      panels: {
        listPanels: [
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
        textPanels: [] as TextPanel[],
        imagePanels: [] as ImagePanel[],
      },
    },
  ],
};

export type ProjectFormType = {
  characters: Character[];
};

export type Character = {
  name: string;
  id: string;
  panels: {
    listPanels: ListPanel[];
    textPanels: TextPanel[];
    imagePanels: ImagePanel[];
  };
};

export type ListPanel = {
  entries: PanelEntry[];
  id: string;
  position: { x: number; y: number };
};

export type TextPanel = {
  entry: string;
  id: string;
  position: { x: number; y: number };
};

export type ImagePanel = {
  entry: string;
  id: string;
  position: { x: number; y: number };
};

export type PanelEntry = {
  title: string;
  description: string;
  id: string;
};

export const createCharacter = (name: string, id: string) => ({
  name,
  id,
  panels: {
    listPanels: [
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
    textPanels: [],
    imagePanel: [],
  },
});
