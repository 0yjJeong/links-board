import { ThunkAction } from 'redux-thunk';
import { NavigateFunction } from 'react-router-dom';
import short from 'short-uuid';
import { RootState } from '..';
import { createBoard, readBoard, scrapUrl, updateBoard } from '../../lib/api';
import { readBoardAsync, scrap, setMessage, updateElements } from './actions';
import { BoardAction } from './types';
import { Element, InitialBoard } from '../../types';
import { timeout } from '../../utils';

export function createBoardThunk(
  body: InitialBoard,
  navigate: NavigateFunction
): ThunkAction<void, RootState, null, BoardAction> {
  return async (dispatch) => {
    try {
      await createBoard(body);
      localStorage.setItem('board', JSON.stringify(body));
      navigate(`/board/${body.id}`, { replace: true });
    } catch (err) {
      dispatch(setMessage('Failed to save board'));
      timeout(2000, () => dispatch(setMessage('')));
    }
  };
}

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
      dispatch(failure(new Error(JSON.stringify(err))));
    }
  };
}

export function updateBoardThunk(
  code: string,
  body: string | Element[][]
): ThunkAction<void, RootState, null, BoardAction> {
  return async (dispatch) => {
    try {
      if (Array.isArray(body)) {
        dispatch(updateElements([body[0], body[1]]));
        await updateBoard(code, { elements: [...body[1], ...body[2]] });
      } else {
        dispatch(updateElements(body));
        await updateBoard(code, { title: body });
      }
    } catch (err) {
      dispatch(setMessage('Failed to update board'));
      timeout(2000, () => dispatch(setMessage('')));
    }
  };
}

export function scrapThunk(
  code: string,
  listId: string,
  url: string,
  setLoading: (value: boolean) => void
): ThunkAction<void, RootState, null, BoardAction> {
  return async (dispatch) => {
    try {
      setLoading(true);

      const metadata = await scrapUrl(code, { url });

      const card = {
        id: short().new(),
        attachedTo: listId,
        url,
        data: metadata,
      };

      dispatch(scrap(card));
      setLoading(false);
    } catch (err) {
      dispatch(setMessage('Failed to scrap'));
      timeout(2000, () => dispatch(setMessage('')));
    }
  };
}
