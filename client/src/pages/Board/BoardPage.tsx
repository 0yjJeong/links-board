import { useCallback, ChangeEvent } from 'react';
import short from 'short-uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard } from '../../lib/api';
import { TitleProps } from '../../types';
import { editTitle } from '../../store/board/actions';
import { RootState } from '../../store';
import { BoardTemplate } from '../../components';

export const BoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const title =
    useSelector((state: RootState) => state.board.data?.title) || '';

  const onAddElement = useCallback(async () => {
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

    await createBoard(body);

    localStorage.setItem('board', JSON.stringify(body));

    navigate(`/board/${body.id}`);
  }, [navigate]);

  const onInputBlurred = useCallback(
    async (payload: ChangeEvent<HTMLInputElement>) => {
      const body = {
        id: short().new(),
        title: payload.target.value,
        elements: [],
      };

      await createBoard(body);

      localStorage.setItem('board', JSON.stringify(body));

      navigate(`/board/${body.id}`);
    },
    [navigate]
  );

  const onEditTitle = useCallback(
    (payload: TitleProps) => dispatch(editTitle(payload)),
    [dispatch]
  );

  return (
    <BoardTemplate
      title={title}
      lists={[]}
      cards={[]}
      onAddElement={onAddElement}
      onEditTitle={onEditTitle}
      onInputBlurred={onInputBlurred}
    />
  );
};
