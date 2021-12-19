import React from 'react';
import { useParams } from 'react-router';
import { Board } from '../';
import { readBoard } from '../../lib/api';

export const BoardSaved = () => {
  const { code } = useParams();

  React.useEffect(() => {
    const init = async () => {
      if (code) {
        const res = await readBoard(code);
        console.log(res);
      }
    };
    init();
  }, [code]);

  return <Board />;
};
