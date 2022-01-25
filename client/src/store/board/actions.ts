import { deprecated, createAsyncAction } from 'typesafe-actions';
import { Element, TitleProps, InitialBoard, Card } from '../../types';
import {
  READ_BOARD_REQUESTED,
  READ_BOARD_SUCCESS,
  READ_BOARD_FAILURE,
  UPDATE_ELEMENTS_REQUESTED,
  UPDATE_ELEMENTS_SUCCESS,
  UPDATE_ELEMENTS_FAILURE,
  DRAG_HAPPENED_REQUESTED,
  DRAG_HAPPENED_SUCCESS,
  DRAG_HAPPENED_FAILURE,
  SCRAP_REQUESTED,
  SCRAP_SUCCESS,
  SCRAP_FAILURE,
  EDIT_TITLE,
} from './types';

const { createStandardAction } = deprecated;

export const readBoardAsync = createAsyncAction(
  READ_BOARD_REQUESTED,
  READ_BOARD_SUCCESS,
  READ_BOARD_FAILURE
)<undefined, InitialBoard>();
export const updateElementsAsync = createAsyncAction(
  UPDATE_ELEMENTS_REQUESTED,
  UPDATE_ELEMENTS_SUCCESS,
  UPDATE_ELEMENTS_FAILURE
)<undefined, string | Element[][]>();
export const dragHappenedAsync = createAsyncAction(
  DRAG_HAPPENED_REQUESTED,
  DRAG_HAPPENED_SUCCESS,
  DRAG_HAPPENED_FAILURE
)<undefined, Element[]>();
export const scrapAsync = createAsyncAction(
  SCRAP_REQUESTED,
  SCRAP_SUCCESS,
  SCRAP_FAILURE
)<undefined, Card>();
export const editTitle = createStandardAction(EDIT_TITLE)<TitleProps>();
