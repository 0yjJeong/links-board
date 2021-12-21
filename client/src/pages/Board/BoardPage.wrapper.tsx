import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  setBoard,
  addElement,
  deleteElement,
  editTitle,
  dragHappened,
} from '../../store/board/actions';
import {
  Element,
  InitialBoard,
  TitleProps,
  Dragged,
  List,
  Card,
} from '../../types';
import { RootState } from '../../store';

export interface BoardPageDefaultProps {
  title: string;
  lists: List[];
  cards: Card[];
  setBoard: (payload: InitialBoard) => void;
  addElement: (payload: Element) => void;
  deleteElement: (payload: Element) => void;
  editTitle: (payload: TitleProps) => void;
  dragHappened: (payload: Dragged) => void;
}

interface BoardPageWrapperProps extends BoardPageDefaultProps {
  Component: React.FunctionComponent<BoardPageDefaultProps>;
}

const Wrapper = ({ Component, ...rest }: BoardPageWrapperProps) => (
  <Component {...rest} />
);

const mapStateToProps = (state: RootState) => ({
  title: state.board.title,
  lists: state.board.lists,
  cards: state.board.cards,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setBoard: (payload: InitialBoard) => dispatch(setBoard(payload)),
  addElement: (payload: Element) => dispatch(addElement(payload)),
  deleteElement: (payload: Element) => dispatch(deleteElement(payload)),
  editTitle: (payload: TitleProps) => dispatch(editTitle(payload)),
  dragHappened: (payload: Dragged) => dispatch(dragHappened(payload)),
});

export const BoardPageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper);
