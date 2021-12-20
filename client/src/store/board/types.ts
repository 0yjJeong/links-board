import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;

export const SET_BOARD = 'board/SET_BOARD';
export const ADD_ELEMENT = 'board/ADD_ELEMENT';
export const DELETE_ELEMENT = 'board/DELETE_ELEMENT';
export const EDIT_TITLE = 'board/EDIT_TITLE';
export const DRAG_HAPPENED = 'board/DRAG_HAPPENED';
