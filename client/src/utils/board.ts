import type { Element, Card, List } from '../types';
import type { DraggableLocation } from 'react-beautiful-dnd';

export const isList = (element: List | Card): element is List =>
  'id' in element && 'title' in element;

export const isCard = (element: List | Card): element is Card =>
  'id' in element && !('title' in element);

export const getElementKey = (element: Element) =>
  isList(element) ? 'lists' : 'cards';

export const getEndPosition = (
  cards: Card[],
  { droppableId, index }: DraggableLocation
) => {
  let i = 0;

  const position = cards.findIndex(
    (card) => card.attachedTo === droppableId && (!index || ++i) && i === index
  );

  return position;
};

export const getListDraggedResult = (startIndex: number, endIndex: number) => {
  const spliceProps = [
    {
      fistIndex: endIndex,
      secondIndex: startIndex,
      deleteCount: startIndex,
    },
    {
      fistIndex: startIndex,
      secondIndex: endIndex,
      deleteCount: startIndex + 1,
    },
  ];

  return startIndex < endIndex ? spliceProps[0] : spliceProps[1];
};
