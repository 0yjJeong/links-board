import { useDispatch } from 'react-redux';
import {
  baseThunk,
  BaseThunkParams,
  BaseThunkReturnType,
} from '../store/board/thunks';

export default function useRequest() {
  const dispatch = useDispatch();
  return {
    request: (params: BaseThunkParams) =>
      dispatch(baseThunk(params)) as unknown as BaseThunkReturnType,
  };
}
