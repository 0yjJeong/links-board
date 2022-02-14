export type Element = List | Card;

export type Elements = Array<Element>;

export interface List {
  id: string;
  title: string;
}

export interface Card {
  id: string;
  attachedTo: string;
  url: string;
  data: {
    image: string | null;
    title: string;
    description: string;
  };
}

export interface InitialBoard {
  id: string;
  title: string;
  elements: Elements;
}

export interface Board {
  id: string | null;
  title: string;
  lists: List[];
  cards: Card[];
}

export interface Dragged {
  elementId: string;
  startId: string;
  startIndex: number;
  endId: string;
  endIndex: number;
  type: string;
}

export interface TitleProps {
  title: string;
  id?: string;
}
