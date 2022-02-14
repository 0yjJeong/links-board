import { deprecated, createReducer, ActionType } from 'typesafe-actions';

const { createStandardAction } = deprecated;

export const SET_MESSAGE = 'base/SET_MESSAGE';
export const SET_ERROR = 'base/SET_ERROR';
export const RESET = 'base/RESET';

export const setMessage = createStandardAction(SET_MESSAGE)<string>();
export const setError = createStandardAction(SET_ERROR)<Error | null>();
export const reset = createStandardAction(RESET)();

export type CoreState = {
  message: string;
  error: Error | null;
};

const initialState: CoreState = {
  message: '',
  error: null,
};

export const reducer = createReducer<
  CoreState,
  ActionType<typeof setMessage | typeof setError | typeof reset>
>(initialState, {
  [SET_MESSAGE]: (state, action) => ({
    ...state,
    message: action.payload,
  }),
  [SET_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [RESET]: () => ({
    error: null,
    message: '',
  }),
});
