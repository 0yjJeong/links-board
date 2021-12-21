import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Board, BoardPageDefaultProps, BoardPageWrapper } from '..';
import { readBoard } from '../../lib/api';

const SavedBoard = ({ setBoard, ...rest }: BoardPageDefaultProps) => {
  const { code } = useParams();

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const init = async () => {
      if (code) {
        const res = await readBoard(code);
        setBoard(res.Item);
        setLoading(false);
      }
    };
    init();
  }, [code, setBoard]);

  if (loading) return null;

  const props = {
    setBoard,
    ...rest,
  };

  return <Board {...props} />;
};

export const SavedBoardPage = () => <BoardPageWrapper Component={SavedBoard} />;
