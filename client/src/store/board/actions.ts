import { deprecated } from 'typesafe-actions';
import { Element, Dragged, TitleProps, InitialBoard } from '../../types';
import {
  ADD_ELEMENT,
  DELETE_ELEMENT,
  DRAG_HAPPENED,
  EDIT_TITLE,
  SET_BOARD,
} from './types';

const { createStandardAction } = deprecated;

export const setBoard = createStandardAction(SET_BOARD)<InitialBoard>();
export const addElement = createStandardAction(ADD_ELEMENT)<Element>();
export const deleteElement = createStandardAction(DELETE_ELEMENT)<Element>();
export const editTitle = createStandardAction(EDIT_TITLE)<TitleProps>();
export const dragHappened = createStandardAction(DRAG_HAPPENED)<Dragged>();
