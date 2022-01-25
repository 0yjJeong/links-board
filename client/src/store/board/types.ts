import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type BoardAction = ActionType<typeof actions>;

export const READ_BOARD_REQUESTED = 'board/READ_BOARD_REQUESTED';
export const READ_BOARD_SUCCESS = 'board/READ_BOARD_SUCCESS';
export const READ_BOARD_FAILURE = 'board/READ_BOARD_FAILURE';

export const UPDATE_ELEMENTS_REQUESTED = 'board/UPDATE_ELEMENTS_REQUESTED';
export const UPDATE_ELEMENTS_SUCCESS = 'board/UPDATE_ELEMENTS_SUCCESS';
export const UPDATE_ELEMENTS_FAILURE = 'board/UPDATE_ELEMENTS_FAILURE';

export const EDIT_TITLE_REQUESTED = 'board/EDIT_TITLE_REQUESTED';
export const EDIT_TITLE_SUCCESS = 'board/EDIT_TITLE_SUCCESS';
export const EDIT_TITLE_FAILURE = 'board/EDIT_TITLE_FAILURE';

export const DRAG_HAPPENED_REQUESTED = 'board/DRAG_HAPPENED_REQUESTED';
export const DRAG_HAPPENED_SUCCESS = 'board/DRAG_HAPPENED_SUCCESS';
export const DRAG_HAPPENED_FAILURE = 'board/DRAG_HAPPENED_FAILURE';

export const SCRAP_REQUESTED = 'board/SCRAP_REQUESTED';
export const SCRAP_SUCCESS = 'board/SCRAP_SUCCESS';
export const SCRAP_FAILURE = 'board/SCRAP_FAILURE';

export const EDIT_TITLE = 'board/EDIT_TITLE';
