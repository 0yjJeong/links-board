import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { editTitle } from '../store/board/actions';
import { TitleProps } from '../types';
import { RootState } from '../store';
import { BoardPageSavedProps } from '../pages';

export interface WrapperProps extends BoardPageSavedProps {
  Component: React.FunctionComponent<BoardPageSavedProps>;
}

const mapStateToProps = (state: RootState) => ({
  data: state.board.data,
  isLoading: state.board.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editTitle: (payload: TitleProps) => dispatch(editTitle(payload)),
});

export const Wrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ Component, ...rest }: WrapperProps) => <Component {...rest} />);
