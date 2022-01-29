import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type BoardAction = ActionType<typeof actions>;

export const READ_BOARD_REQUESTED = 'board/READ_BOARD_REQUESTED';
export const READ_BOARD_SUCCESS = 'board/READ_BOARD_SUCCESS';
export const READ_BOARD_FAILURE = 'board/READ_BOARD_FAILURE';

export const UPDATE_ELEMENTS = 'board/UPDATE_ELEMENTS';

export const SCRAP = 'board/SCRAP';

export const EDIT_TITLE = 'board/EDIT_TITLE';

export const SET_MESSAGE = 'board/SET_MESSAGE';
