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

export const updateLists = (
  prevLists: List[],
  startIndex: number,
  endIndex: number
) => {
  const nextLists = [...prevLists];

  const { fistIndex, secondIndex, deleteCount } = getListDraggedResult(
    startIndex,
    endIndex
  );

  nextLists.splice(endIndex, 1, nextLists[fistIndex], nextLists[secondIndex]);
  nextLists.splice(deleteCount, 1);

  return nextLists;
};

export const updateCards = (
  prevCards: Card[],
  elementId: string,
  endId: string,
  endIndex: number
) => {
  let nextCards = [...prevCards];

  let draggedCardIndex = nextCards.findIndex((card) => card.id === elementId);

  let draggedCard: Card | null = null;
  if (draggedCardIndex !== -1) {
    draggedCard = { ...nextCards[draggedCardIndex], attachedTo: endId };
  }

  if (draggedCard) {
    nextCards.splice(draggedCardIndex, 1);

    let endPosition = getEndPosition(nextCards, {
      droppableId: endId,
      index: endIndex,
    });

    if (endPosition === -1) {
      nextCards.push(draggedCard);
    } else {
      if (endIndex !== 0) ++endPosition;
      nextCards.splice(endPosition, 0, draggedCard);
    }
  }

  return nextCards;
};
