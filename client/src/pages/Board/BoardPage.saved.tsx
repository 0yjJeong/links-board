import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { readBoardThunk, updateBoardThunk } from '../../store/board/thunks';
import { readBoardAsync } from '../../store/board/actions';
import { State } from '../../store/board/reducer';
import { getElementKey, updateLists, updateCards } from '../../utils/board';
import { Base, Canvas, Column } from '../../components';
import { BoardHeaderDefault as BoardHeader } from '../../components/board/header/Header.default';
import { safe } from '../../utils';
import {
  InitialBoard,
  TitleProps,
  Element,
  Dragged,
  Card,
  List,
} from '../../types';

export interface BoardPageSavedProps extends State {
  editTitle: (payload: TitleProps) => void;
}

export const BoardPageSaved = ({
  data,
  isLoading,
  error,
  editTitle,
}: BoardPageSavedProps) => {
  const { code } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const { success: setBoard } = readBoardAsync;

    const init = async () => {
      if (code) {
        const board = localStorage.getItem('board');
        if (!board) {
          dispatch(readBoardThunk(code));
        } else {
          dispatch(setBoard(JSON.parse(board) as InitialBoard));
          localStorage.removeItem('board');
        }
      }
    };
    init();

    return () => {
      dispatch(
        setBoard({
          id: '',
          title: '',
          elements: [],
        })
      );
    };
  }, [navigate, code, dispatch]);

  React.useEffect(() => {
    if (error) {
      navigate('/board', { replace: true });
    }
  }, [error, navigate]);

  const groupedCardsMap = React.useMemo(
    () =>
      (data &&
        data.cards.reduce((obj, card) => {
          try {
            obj[card.attachedTo].push(card);
          } catch (err) {
            obj[card.attachedTo] = [card];
          }
          return obj;
        }, {} as { [key: string]: Card[] })) ||
      {},
    [data]
  );

  const onAddElement = React.useCallback(
    (element: Element) => {
      if (code) {
        if (data) {
          const key = getElementKey(element);

          const arr =
            key === 'lists'
              ? [data.lists, data.cards]
              : [data.cards, data.lists];

          const nextElements = [...arr[0], element];

          dispatch(updateBoardThunk(code, [arr[0], nextElements, arr[1]]));
        }
      }
    },
    [code, data, dispatch]
  );

  const onDeleteElement = React.useCallback(
    (element: Element) => {
      if (code) {
        if (data) {
          const key = getElementKey(element);

          const arr =
            key === 'lists'
              ? [data.lists, data.cards]
              : [data.cards, data.lists];

          const index = arr[0].findIndex((el) => el.id === element.id);

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

  const onInputBlurred = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (code) {
        if (data) {
          if (event.target.name === 'title') {
            dispatch(updateBoardThunk(code, event.target.value));
          } else {
            dispatch(updateBoardThunk(code, [[], data.lists, data.cards]));
          }
        }
      }
    },
    [code, data, dispatch]
  );

  const onDragHappened = React.useCallback(
    (dragged: Dragged) => {
      if (code) {
        if (data) {
          const { type, elementId, startIndex, endId, endIndex } = dragged;

          const arr =
            type === 'list'
              ? [data.lists, data.cards]
              : [data.cards, data.lists];
          let nextElements: List[] | Card[] = [];
          if (type === 'list') {
            nextElements = updateLists(data.lists, startIndex, endIndex);
          } else if (type === 'card') {
            nextElements = updateCards(data.cards, elementId, endId, endIndex);
          }
          dispatch(updateBoardThunk(code, [arr[0], nextElements, arr[1]]));
        }
      }
    },
    [code, data, dispatch]
  );

  const onEditTitle = React.useCallback(
    (title: string, id?: string) => {
      editTitle({ title, id });
    },
    [editTitle]
  );

  if (isLoading || !data) {
    return null;
  }

  return (
    <Base>
      <BoardHeader
        title={data.title}
        onDeleteBoard={() => {}}
        onInputBlurred={onInputBlurred}
        onEditTitle={onEditTitle}
      />
      <Canvas onAddElement={onAddElement} onDragHappened={onDragHappened}>
        <>
          {data.lists.map((list, index) => (
            <Column
              key={list.id}
              index={index}
              list={list}
              isLoading={isLoading}
              cards={safe(() => groupedCardsMap[list.id], [])}
              onEditTitle={onEditTitle}
              onDeleteElement={onDeleteElement}
              onAddElement={onAddElement}
              onInputBlurred={onInputBlurred}
            />
          ))}
        </>
      </Canvas>
    </Base>
  );
};
