import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;

export const SET_BOARD = 'board/SET_BOARD';
export const UPDATE_ELEMENTS = 'board/UPDATE_ELEMENTS';
export const EDIT_TITLE = 'board/EDIT_TITLE';
export const DRAG_HAPPENED = 'board/DRAG_HAPPENED';
