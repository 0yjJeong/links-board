import { deprecated, createReducer, ActionType } from 'typesafe-actions';

const { createStandardAction } = deprecated;

export const SET_TOAST = 'board/SET_TOAST';

export const setToast = createStandardAction(SET_TOAST)<string>();

export type State = {
  toast: string;
};

const initialState: State = {
  toast: '',
};

export const reducer = createReducer<State, ActionType<typeof setToast>>(
  initialState,
  {
    [SET_TOAST]: (state, action) => ({
      ...state,
      toast: action.payload,
    }),
  }
);
