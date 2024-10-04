export type ProjectFormType = {
  name: string;
  characters: PanelPage[];
  places: PanelPage[];
  maps: PanelPage[];
  articles: ArticlePage[];
};

export type ArticlePage = {
  name: string;
  id: string;
  text: string;
};

export type PanelPage = {
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

export type AnyPanel = ListPanel | TextPanel | ImagePanel;
