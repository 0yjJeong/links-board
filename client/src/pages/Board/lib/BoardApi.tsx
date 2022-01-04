import { useEffect, useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { readBoard } from '../../../lib/api';
import { setBoard } from '../../../store/board/actions';
import { InitialBoard } from '../../../types';

export const BoardAPI: FC = ({ children }) => {
  const { code } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (code) {
        const board = localStorage.getItem('board');
        if (!board) {
          try {
            const res = await readBoard(code);
            dispatch(setBoard(res.Item));
          } catch (err) {
            navigate('/board', { replace: true });
          }
        } else {
          dispatch(setBoard(JSON.parse(board) as InitialBoard));
          localStorage.removeItem('board');
        }
      }

      setLoading(false);
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

  if (loading) return null;
  return <>{children}</>;
};
