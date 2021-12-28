import { deprecated } from 'typesafe-actions';
import { Element, TitleProps, InitialBoard } from '../../types';
import { UPDATE_ELEMENTS, DRAG_HAPPENED, EDIT_TITLE, SET_BOARD } from './types';

const { createStandardAction } = deprecated;

export const setBoard = createStandardAction(SET_BOARD)<InitialBoard>();
export const updateElements =
  createStandardAction(UPDATE_ELEMENTS)<Element[]>();
export const editTitle = createStandardAction(EDIT_TITLE)<TitleProps>();
export const dragHappened = createStandardAction(DRAG_HAPPENED)<Element[]>();
