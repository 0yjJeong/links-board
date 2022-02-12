import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import short from 'short-uuid';
import { baseThunk } from '../../store/board/thunks';
import { Base, Canvas } from '../../components';
import { BoardHeaderDefault as BoardHeader } from '../../components/board/header/Header.default';
import { createBoard } from '../../lib/api';
import { InitialBoard } from '../../types';

export const BoardPageNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createBoardRequest = React.useCallback(
    (body: InitialBoard) => {
      return (
        dispatch(
          baseThunk({
            callback: () => createBoard(body),
          })
        ) as unknown as Promise<{ dispatch: Dispatch; response: any }>
      ).then(() => {
        localStorage.setItem('board', JSON.stringify(body));
        navigate(`/board/${body.id}`, { replace: true });
      });
    },
    [dispatch, navigate]
  );

  const onAddElement = React.useCallback(() => {
    const body = {
      id: short().new(),
      title: '',
      elements: [
        {
          id: short().new(),
          title: '',
        },
      ],
    };
    createBoardRequest(body);
  }, [createBoardRequest]);

  const onInputBlurred = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const body = {
        id: short().new(),
        title: event.target.value,
        elements: [],
      };
      createBoardRequest(body);
    },
    [createBoardRequest]
  );

  return (
    <Base>
      <BoardHeader
        code={undefined}
        title={null}
        onDeleteBoard={() => {}}
        onInputBlurred={onInputBlurred}
        onEditTitle={() => {}}
      />
      <Canvas onAddElement={onAddElement}>
        <></>
      </Canvas>
    </Base>
  );
};
