import { deprecated, createAsyncAction } from 'typesafe-actions';
import { Element, TitleProps, InitialBoard, Card } from '../../types';
import {
  READ_BOARD_REQUESTED,
  READ_BOARD_SUCCESS,
  READ_BOARD_FAILURE,
  UPDATE_ELEMENTS,
  EDIT_TITLE,
  SCRAP,
  SET_MESSAGE,
} from './types';

const { createStandardAction } = deprecated;

export const readBoardAsync = createAsyncAction(
  READ_BOARD_REQUESTED,
  READ_BOARD_SUCCESS,
  READ_BOARD_FAILURE
)<undefined, InitialBoard, Error>();

export const updateElements = createStandardAction(UPDATE_ELEMENTS)<
  string | Element[][]
>();

export const editTitle = createStandardAction(EDIT_TITLE)<TitleProps>();

export const scrap = createStandardAction(SCRAP)<Card>();

export const setMessage = createStandardAction(SET_MESSAGE)<string>();
