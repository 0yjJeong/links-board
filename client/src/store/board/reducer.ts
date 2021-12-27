import { createReducer } from 'typesafe-actions';
import { Board, Card } from '../../types';
import {
  Action,
  SET_BOARD,
  // ADD_ELEMENT,
  EDIT_TITLE,
  // DELETE_ELEMENT,
  DRAG_HAPPENED,
  UPDATE_ELEMENTS,
} from './types';
import {
  getElementKey,
  getEndPosition,
  getListDraggedResult,
  isCard,
  isList,
} from '../../utils/board';

export type State = Board;

export const initialState: State = {
  id: null,
  title: '',
  lists: [],
  cards: [],
};

export const reducer = createReducer<State, Action>(initialState, {
  [SET_BOARD]: (_, action) => {
    const elements = action.payload.elements;
    const nextElements: Omit<Board, 'id' | 'title'> = {
      lists: [],
      cards: [],
    };

    elements.reduce((prev, element) => {
      if (isList(element)) {
        prev.lists.push(element);
      } else if (isCard(element)) {
        prev.cards.push(element);
      }
      return prev;
    }, nextElements);

    return {
      id: action.payload.id,
      title: action.payload.title,
      lists: nextElements.lists,
      cards: nextElements.cards,
    };
  },
  // [ADD_ELEMENT]: (state, action) => {
  //   const key = getElementKey(action.payload);

  //   return {
  //     ...state,
  //     [key]: [...state[key], action.payload],
  //   };
  // },
  [UPDATE_ELEMENTS]: (state, action) => {
    const key = getElementKey(action.payload[0]);

    return {
      ...state,
      [key]: action.payload,
    };
  },
  [EDIT_TITLE]: (state, action) => {
    if (action.payload.id) {
      const index = state.lists.findIndex(
        (element) => element.id === action.payload.id
      );
      const nextLists = [...state.lists];
      const list = nextLists[index];

      list.title = action.payload.title;

      return { ...state, lists: nextLists };
    }

    return {
      ...state,
      title: action.payload.title,
    };
  },
  // [DELETE_ELEMENT]: (state, action) => {
  //   const key = getElementKey(action.payload);

  //   const index = state[key].findIndex(
  //     (element) => element.id === action.payload.id
  //   );

  //   return {
  //     ...state,
  //     [key]: [...state[key].slice(0, index), ...state[key].slice(index + 1)],
  //   };
  // },
  [DRAG_HAPPENED]: (state, action) => {
    // const { type, elementId, startIndex, endId, endIndex } = action.payload;

    // if (type === 'list') {
    //   const nextLists = [...state.lists];

    //   const { fistIndex, secondIndex, deleteCount } = getListDraggedResult(
    //     startIndex,
    //     endIndex
    //   );

    //   nextLists.splice(
    //     endIndex,
    //     1,
    //     nextLists[fistIndex],
    //     nextLists[secondIndex]
    //   );
    //   nextLists.splice(deleteCount, 1);

    //   return {
    //     ...state,
    //     lists: nextLists,
    //   };
    // } else if (type === 'card') {
    //   let nextCards = [...state.cards];

    //   let draggedCardIndex = nextCards.findIndex(
    //     (card) => card.id === elementId
    //   );

    //   let draggedCard: Card | null = null;
    //   if (draggedCardIndex !== -1) {
    //     draggedCard = { ...nextCards[draggedCardIndex], attachedTo: endId };
    //   }

    //   if (draggedCard) {
    //     nextCards.splice(draggedCardIndex, 1);

    //     let endPosition = getEndPosition(nextCards, {
    //       droppableId: endId,
    //       index: endIndex,
    //     });

    //     if (endPosition === -1) {
    //       nextCards.push(draggedCard);
    //     } else {
    //       if (endIndex !== 0) ++endPosition;
    //       nextCards.splice(endPosition, 0, draggedCard);
    //     }
    //   }

    //   return {
    //     ...state,
    //     cards: nextCards,
    //   };
    // }

    const key = getElementKey(action.payload[0]);

    return {
      ...state,
      [key]: action.payload,
    };
  },
});
