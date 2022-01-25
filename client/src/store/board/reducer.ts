import { createReducer } from 'typesafe-actions';
import { Board } from '../../types';
import {
  BoardAction,
  READ_BOARD_REQUESTED,
  READ_BOARD_SUCCESS,
  READ_BOARD_FAILURE,
  UPDATE_ELEMENTS_REQUESTED,
  UPDATE_ELEMENTS_SUCCESS,
  UPDATE_ELEMENTS_FAILURE,
  DRAG_HAPPENED_REQUESTED,
  DRAG_HAPPENED_FAILURE,
  DRAG_HAPPENED_SUCCESS,
  SCRAP_REQUESTED,
  SCRAP_FAILURE,
  SCRAP_SUCCESS,
  EDIT_TITLE,
} from './types';
import { getElementKey, isCard, isList } from '../../utils/board';

export interface State {
  isLoading: boolean;
  status: 'READING' | 'UPDATING' | 'DRAGGED' | 'SCRAPING' | 'NONE';
  data: Board | null;
  error: Error | null;
}

export const initialState: State = {
  isLoading: false,
  status: 'NONE',
  data: null,
  error: null,
};

export const reducer = createReducer<State, BoardAction>(initialState, {
  [READ_BOARD_REQUESTED]: () => {
    return {
      isLoading: true,
      status: 'READING',
      data: null,
      error: null,
    };
  },
  [READ_BOARD_FAILURE]: () => {
    return {
      isLoading: false,
      status: 'NONE',
      data: null,
      error: new Error('readBoard'),
    };
  },
  [READ_BOARD_SUCCESS]: (_, action) => {
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

    const data = {
      id: action.payload.id,
      title: action.payload.title,
      ...nextElements,
    };

    return {
      data: data,
      status: 'NONE',
      isLoading: false,
      error: null,
    };
  },
  [UPDATE_ELEMENTS_REQUESTED]: (state) => {
    return {
      ...state,
      status: 'UPDATING',
      isLoading: true,
      error: null,
    };
  },
  [UPDATE_ELEMENTS_FAILURE]: (state) => {
    return {
      ...state,
      status: 'NONE',
      isLoading: false,
      error: new Error('updateElements'),
    };
  },
  [UPDATE_ELEMENTS_SUCCESS]: (state, action) => {
    if (state.data && Array.isArray(action.payload)) {
      const key = getElementKey(action.payload[0][0] || action.payload[1][0]);

      return {
        ...state,
        status: 'NONE',
        data: {
          ...state.data,
          [key]: action.payload[1],
        },
      };
    }
    return state;
  },
  [DRAG_HAPPENED_REQUESTED]: (state) => {
    return {
      ...state,
      status: 'DRAGGED',
      isLoading: true,
      error: null,
    };
  },
  [DRAG_HAPPENED_FAILURE]: (state) => {
    return {
      ...state,
      status: 'NONE',
      isLoading: false,
      error: new Error('dragHappened'),
    };
  },
  [DRAG_HAPPENED_SUCCESS]: (state, action) => {
    if (state.data) {
      const key = getElementKey(action.payload[0]);

      return {
        isLoading: false,
        error: null,
        status: 'NONE',
        data: {
          ...state.data,
          [key]: action.payload,
        },
      };
    }
    return state;
  },
  [SCRAP_REQUESTED]: (state) => {
    return {
      ...state,
      isLoading: true,
      status: 'SCRAPING',
      error: null,
    };
  },
  [SCRAP_FAILURE]: (state) => {
    return {
      ...state,
      status: 'NONE',
      isLoading: false,
      error: new Error('scrap'),
    };
  },
  [SCRAP_SUCCESS]: (state, action) => {
    if (state.data) {
      return {
        isLoading: false,
        error: null,
        status: 'NONE',
        data: {
          ...state.data,
          cards: [...state.data.cards, action.payload],
        },
      };
    }
    return state;
  },
  [EDIT_TITLE]: (state, action) => {
    if (state.data) {
      if (action.payload.id) {
        const index = state.data.lists.findIndex(
          (element) => element.id === action.payload.id
        );
        const nextLists = [...state.data.lists];
        nextLists[index].title = action.payload.title;

        return {
          ...state,
          data: {
            ...state.data,
            lists: nextLists,
          },
        };
      }

      return {
        ...state,
        data: {
          ...state.data,
          title: action.payload.title,
        },
      };
    }
    return state;
  },
});
