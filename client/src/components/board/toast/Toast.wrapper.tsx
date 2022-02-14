import React from 'react';
import { HiCheck } from 'react-icons/hi';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { CSSProperties } from 'styled-components';
import { reset } from '../../../store/base';
import { timeout } from '../../../utils';
import { ToastDefault } from './Toast.default';

interface ToastWrapperProps {
  message: string;
  error: Error | null;
}

const ToastWrapper = ({ message, error }: ToastWrapperProps) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (message) {
      timeout(3000, () => dispatch(reset()));
    }
  }, [message, dispatch]);

  const Icon = error ? RiCloseCircleFill : HiCheck;

  const iconStyles = React.useMemo<CSSProperties>(
    () => ({
      color: error ? '#ff3912' : '#00b530',
    }),
    [error]
  );

  if (!message) return null;

  return (
    <ToastDefault color={iconStyles.color!}>
      <Icon style={iconStyles} />
      <div>{message}</div>
    </ToastDefault>
  );
};

export default ToastWrapper;
