import { ThunkAction } from 'redux-thunk';
import { Dispatch, Action } from 'redux';
import { RootState } from '..';
import { BoardAction } from './types';

export type BaseThunkParams = {
  callback: (...params: any) => Promise<any>;
  request?: () => Action;
  failure?: () => Action;
};

export type BaseThunkReturnType = Promise<{
  dispatch: Dispatch;
  response: any;
}>;

export function baseThunk({
  callback,
  request,
  failure,
}: BaseThunkParams): ThunkAction<
  BaseThunkReturnType,
  RootState,
  null,
  BoardAction
> {
  return async (dispatch) => {
    request && dispatch(request());
    try {
      const response = await callback();
      return Promise.resolve({ dispatch, response });
    } catch (err) {
      failure && dispatch(failure());
      return Promise.reject();
    }
  };
}
