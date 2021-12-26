import { useEffect, useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { readBoard } from '../../../lib/api';
import { setBoard } from '../../../store/board/actions';

export const BoardAPI: FC = ({ children }) => {
  const { code } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (code) {
        const res = await readBoard(code);
        dispatch(setBoard(res.Item));
        setLoading(false);
      }
    };
    init();
  }, [code, dispatch]);

  if (loading) return null;
  return <>{children}</>;
};
