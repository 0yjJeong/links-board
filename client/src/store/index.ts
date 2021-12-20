import { combineReducers } from 'redux';
import * as board from './board/reducer';

export type RootState = {
  board: board.State;
};

const rootReducer = combineReducers({
  board: board.reducer,
});

export default rootReducer;
