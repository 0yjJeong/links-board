import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { readBoard, scrapUrl, updateBoard } from '../../lib/api';
import {
  dragHappenedAsync,
  readBoardAsync,
  scrapAsync,
  updateElementsAsync,
} from './actions';
import { BoardAction } from './types';
import { Card, Element } from '../../types';

export function readBoardThunk(
  code: string
): ThunkAction<void, RootState, null, BoardAction> {
  return async (dispatch) => {
    const { request, success, failure } = readBoardAsync;
    dispatch(request());
    try {
      const res = await readBoard(code);
      dispatch(success(res.Item));
    } catch (err) {
      dispatch(failure(err, {}));
    }
  };
}

export function updateBoardThunk(
  code: string,
  body: string | Element[][]
): ThunkAction<void, RootState, null, BoardAction> {
  return async (dispatch) => {
    const { request, success, failure } = updateElementsAsync;
    dispatch(request());
    try {
      if (Array.isArray(body)) {
        await updateBoard(code, { elements: [...body[1], ...body[2]] });
        dispatch(success([body[0], body[1]]));
      } else {
        await updateBoard(code, { title: body });
        dispatch(success(body));
      }
    } catch (err) {
      dispatch(failure(err, {}));
    }
  };
}

export function dragHappenedThunk(
  code: string,
  body: Element[][]
): ThunkAction<void, RootState, null, BoardAction> {
  return async (dispatch) => {
    const { request, success, failure } = dragHappenedAsync;
    dispatch(request());
    try {
      await updateBoard(code, { elements: [...body[0], ...body[1]] });
      dispatch(success(body[0]));
    } catch (err) {
      dispatch(failure(err, {}));
    }
  };
}

export function scrapThunk(
  code: string,
  body: Omit<Card, 'data'>
): ThunkAction<void, RootState, null, BoardAction> {
  return async (dispatch) => {
    const { request, success, failure } = scrapAsync;
    dispatch(request());
    try {
      const metadata = await scrapUrl(code, body);
      dispatch(
        success({
          id: body.id,
          url: body.url,
          attachedTo: body.attachedTo,
          data: metadata,
        })
      );
    } catch (err) {
      dispatch(failure(err, {}));
    }
  };
}
