import { combineReducers } from 'redux';
import * as board from './board/reducer';
import * as base from './base';

export type RootState = {
  board: board.BoardState;
  base: base.CoreState;
};

const rootReducer = combineReducers({
  board: board.reducer,
  base: base.reducer,
});

export default rootReducer;
