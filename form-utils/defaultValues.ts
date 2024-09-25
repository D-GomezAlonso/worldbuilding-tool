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
  panels: Panel[];
};

export type Panel = {
  entries: PanelEntry[];
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
