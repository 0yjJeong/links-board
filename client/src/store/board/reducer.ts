import { createReducer } from 'typesafe-actions';
import { Board } from '../../types';
import {
  Action,
  SET_BOARD,
  EDIT_TITLE,
  DRAG_HAPPENED,
  UPDATE_ELEMENTS,
} from './types';
import { getElementKey, isCard, isList } from '../../utils/board';

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
  [DRAG_HAPPENED]: (state, action) => {
    const key = getElementKey(action.payload[0]);

    return {
      ...state,
      [key]: action.payload,
    };
  },
});
