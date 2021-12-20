import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Board } from '../';
import { readBoard } from '../../lib/api';

export const BoardSaved = () => {
  const { code } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const init = async () => {
      if (code) {
        const res = await readBoard(code);
        setLoading(false);
      }
    };
    init();
  }, [code, dispatch]);

  if (loading) return null;

  return <Board />;
};
