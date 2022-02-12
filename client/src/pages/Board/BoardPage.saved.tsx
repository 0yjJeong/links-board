import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { readBoardAsync, updateElements } from '../../store/board/actions';
import { State } from '../../store/board/reducer';
import { getElementKey, updateLists, updateCards } from '../../utils/board';
import { Base, Canvas, Column } from '../../components';
import { BoardHeaderDefault as BoardHeader } from '../../components/board/header/Header.default';
import { safe } from '../../utils';
import { deleteBoard, readBoard, updateBoard } from '../../lib/api';
import {
  InitialBoard,
  TitleProps,
  Element,
  Dragged,
  Card,
  List,
} from '../../types';
import useRequest from '../../hooks/useRequest';

export interface BoardPageSavedProps extends Omit<State, 'message'> {
  editTitle: (payload: TitleProps) => void;
}

export const BoardPageSaved = ({
  data,
  isLoading,
  editTitle,
}: BoardPageSavedProps) => {
  const { code } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { request } = useRequest();

  React.useEffect(() => {
    const { request: requestReadBoard, success: successReadBoard } =
      readBoardAsync;

    const init = async () => {
      if (code) {
        const board = localStorage.getItem('board');
        if (!board) {
          request({
            callback: () => readBoard(code),
            request: () => requestReadBoard(),
          })
            .then(({ dispatch, response }) => {
              dispatch(successReadBoard(response.Item));
            })
            .catch(() => {
              navigate('/board', { replace: true });
            });
        } else {
          dispatch(successReadBoard(JSON.parse(board) as InitialBoard));
          localStorage.removeItem('board');
        }
      }
    };
    init();

    return () => {
      dispatch(
        successReadBoard({
          id: '',
          title: '',
          elements: [],
        })
      );
    };
  }, [navigate, code, dispatch]);

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

          request({
            callback: () =>
              updateBoard(code, { elements: [...nextElements, ...arr[1]] }),
            request: () => updateElements([arr[0], nextElements]),
          });
        }
      }
    },
    [code, data, request]
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

          request({
            callback: () =>
              updateBoard(code, { elements: [...nextElements, ...arr[1]] }),
            request: () => updateElements([arr[0], nextElements]),
          });
        }
      }
    },
    [code, data, request]
  );

  const onInputBlurred = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (code) {
        if (data) {
          if (event.target.name === 'title') {
            request({
              callback: () => updateBoard(code, { title: event.target.value }),
            });
          } else {
            request({
              callback: () =>
                updateBoard(code, {
                  elements: [...data.lists, ...data.cards],
                }),
            });
          }
        }
      }
    },
    [code, data, request]
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

          request({
            callback: () =>
              updateBoard(code, { elements: [...nextElements, ...arr[1]] }),
            request: () => updateElements([arr[0], nextElements]),
          });
        }
      }
    },
    [code, data, request]
  );

  const onDeleteBoard = React.useCallback(() => {
    if (code) {
      request({
        callback: () => deleteBoard(code),
      }).then(() => {
        navigate('/', { replace: true });
      });
    }
  }, [code, navigate, request]);

  const onEditTitle = React.useCallback(
    (title: string, id?: string) => {
      editTitle({ title, id });
    },
    [editTitle]
  );

  if (!(!isLoading && data && code)) {
    return null;
  }

  return (
    <Base>
      <BoardHeader
        code={code}
        title={data.title}
        onDeleteBoard={onDeleteBoard}
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
              code={code}
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
