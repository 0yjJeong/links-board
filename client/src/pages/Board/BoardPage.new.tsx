import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import short from 'short-uuid';
import { createBoardThunk } from '../../store/board/thunks';
import { Base, Canvas } from '../../components';
import { BoardHeaderDefault as BoardHeader } from '../../components/board/header/Header.default';

export const BoardPageNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(createBoardThunk(body, navigate));
  }, [dispatch, navigate]);

  const onInputBlurred = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const body = {
        id: short().new(),
        title: event.target.value,
        elements: [],
      };
      dispatch(createBoardThunk(body, navigate));
    },
    [dispatch, navigate]
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
