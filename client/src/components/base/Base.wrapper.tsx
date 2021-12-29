import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Toast } from '..';
import { RootState } from '../../store';
import { setToast } from '../../store/base';

const BaseWrapper = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.base.toast);

  return (
    <>
      <Toast
        text={toast}
        millisecond={1500}
        onTimeout={() => dispatch(setToast(''))}
      />
      <Outlet />
    </>
  );
};

export default BaseWrapper;
