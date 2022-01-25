import { useEffect, useCallback, useMemo, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Dragged, Element, InitialBoard, TitleProps } from '../../types';
import { getElementKey, updateCards, updateLists } from '../../utils/board';
import { BoardTemplate } from '../../components';
import {
  dragHappenedThunk,
  readBoardThunk,
  updateBoardThunk,
} from '../../store/board/thunks';
import { READ_BOARD_SUCCESS } from '../../store/board/types';
import { editTitle } from '../../store/board/actions';
import { WrapperProps } from '../../additional-components';
import { State } from '../../store/board/reducer';

export interface BoardPageSavedProps extends State {
  editTitle: (payload: TitleProps) => void;
}

export const BoardPageSaved = ({
  data,
  isLoading,
  error,
  status,
}: Omit<WrapperProps, 'Component'>) => {
  const { code } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (code) {
        const board = localStorage.getItem('board');
        if (!board) {
          try {
            dispatch(readBoardThunk(code));
          } catch (err) {
            navigate('/board', { replace: true });
          }
        } else {
          dispatch({
            type: READ_BOARD_SUCCESS,
            payload: JSON.parse(board) as InitialBoard,
          });
          localStorage.removeItem('board');
        }
      }
    };
    init();

    return () => {
      dispatch({
        type: READ_BOARD_SUCCESS,
        payload: {
          id: null,
          title: '',
          elements: [],
        },
      });
    };
  }, [navigate, code, dispatch]);

  const onAddElement = useCallback(
    async (payload: Element) => {
      if (code) {
        if (data) {
          const key = getElementKey(payload);

          const arr =
            key === 'lists'
              ? [data.lists, data.cards]
              : [data.cards, data.lists];

          const nextElements = [...arr[0], payload];

          dispatch(updateBoardThunk(code, [arr[0], nextElements, arr[1]]));
        }
      }
    },
    [code, data, dispatch]
  );

  const onDeleteElement = useCallback(
    async (payload: Element) => {
      if (code) {
        if (data) {
          const key = getElementKey(payload);

          const arr =
            key === 'lists'
              ? [data.lists, data.cards]
              : [data.cards, data.lists];

          const index = arr[0].findIndex(
            (element) => element.id === payload.id
          );

          const nextElements = [
            ...arr[0].slice(0, index),
            ...arr[0].slice(index + 1),
          ];

          dispatch(updateBoardThunk(code, [arr[0], nextElements, arr[1]]));
        }
      }
    },
    [code, data, dispatch]
  );

  const onInputBlurred = useCallback(
    async (payload: ChangeEvent<HTMLInputElement>) => {
      if (code) {
        if (data) {
          if (payload.target.name === 'title') {
            dispatch(updateBoardThunk(code, payload.target.value));
          } else {
            dispatch(updateBoardThunk(code, [[], data.lists, data.cards]));
          }
        }
      }
    },
    [code, data, dispatch]
  );

  const onDragHappened = useCallback(
    async (payload: Dragged) => {
      if (code) {
        if (data) {
          const { type, elementId, startIndex, endId, endIndex } = payload;

          let arr =
            type === 'lists'
              ? [data.lists, data.cards]
              : [data.cards, data.lists];

          if (type === 'list') {
            arr[0] = updateLists(data.lists, startIndex, endIndex);
          } else if (type === 'card') {
            arr[0] = updateCards(data.cards, elementId, endId, endIndex);
          }

          dispatch(dragHappenedThunk(code, arr));

          // if (elements.length) {
          //   dragHappened(elements);
          // }

          // const key = getElementKey(elements[0]);

          // await updateBoard(code, {
          //   elements:
          //     key === 'lists'
          //       ? [...prevCards, ...elements]
          //       : [...prevLists, ...elements],
          // });
        }
      }
    },
    [code, data, dispatch]
  );

  const onEditTitle = useCallback(
    (payload: TitleProps) => {
      dispatch(editTitle(payload));
    },
    [dispatch]
  );

  if (isLoading && status === 'READING') {
    return null;
  }
  if (!data) {
    return null;
  }

  const { title, lists, cards } = data;

  return (
    <BoardTemplate
      title={title}
      lists={lists}
      cards={cards}
      onAddElement={onAddElement}
      onEditTitle={onEditTitle}
      onInputBlurred={onInputBlurred}
      onDragHappened={onDragHappened}
      onDeleteElement={onDeleteElement}
    />
  );
};
