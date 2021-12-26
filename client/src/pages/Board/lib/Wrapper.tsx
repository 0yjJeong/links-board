import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  addElement,
  deleteElement,
  editTitle,
  dragHappened,
} from '../../../store/board/actions';
import { Element, TitleProps, Dragged, List, Card } from '../../../types';
import { RootState } from '../../../store';

export type BoardProps = {
  title: string;
  lists: List[];
  cards: Card[];
  addElement: (payload: Element) => void;
  deleteElement: (payload: Element) => void;
  editTitle: (payload: TitleProps) => void;
  dragHappened: (payload: Dragged) => void;
};

interface WrapperProps extends BoardProps {
  Component: React.FunctionComponent<BoardProps>;
}

const mapStateToProps = (state: RootState) => ({
  title: state.board.title,
  lists: state.board.lists,
  cards: state.board.cards,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addElement: (payload: Element) => dispatch(addElement(payload)),
  deleteElement: (payload: Element) => dispatch(deleteElement(payload)),
  editTitle: (payload: TitleProps) => dispatch(editTitle(payload)),
  dragHappened: (payload: Dragged) => dispatch(dragHappened(payload)),
});

export const BoardPageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ Component, ...rest }: WrapperProps) => <Component {...rest} />);
