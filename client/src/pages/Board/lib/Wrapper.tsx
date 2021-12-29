import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  updateElements,
  editTitle,
  dragHappened,
} from '../../../store/board/actions';
import { Element, TitleProps, List, Card } from '../../../types';
import { RootState } from '../../../store';
import { setSyntheticTrailingComments } from 'typescript';
import { setToast } from '../../../store/base';

export type BoardProps = {
  title: string;
  lists: List[];
  cards: Card[];
  updateElements: (payload: Element[]) => void;
  editTitle: (payload: TitleProps) => void;
  dragHappened: (payload: Element[]) => void;
  setToast: (text: string) => void;
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
  updateElements: (payload: Element[]) => dispatch(updateElements(payload)),
  editTitle: (payload: TitleProps) => dispatch(editTitle(payload)),
  dragHappened: (payload: Element[]) => dispatch(dragHappened(payload)),
  setToast: (payload: string) => dispatch(setToast(payload)),
});

export const BoardPageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ Component, ...rest }: WrapperProps) => <Component {...rest} />);
