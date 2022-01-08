import React, { useRef, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { Button } from '..';
import { ToastDefault } from '../..';

interface ToastWrapperProps {
  text: string;
  millisecond: number;
  onTimeout: () => void;
}

const ToastWrapper = ({ millisecond, text, onTimeout }: ToastWrapperProps) => {
  let timer = useRef<NodeJS.Timeout>();

  const handleTimeout = React.useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = undefined;
      onTimeout();
    }
  }, [onTimeout]);

  useEffect(() => {
    if (typeof timer.current === 'undefined') {
      if (text) {
        if (millisecond) {
          timer.current = setTimeout(handleTimeout, millisecond);
        }
      }
    }
  }, [text, millisecond, handleTimeout]);

  if (!text) return null;

  return (
    <ToastDefault>
      {text}
      <Button series='tertiary' onClick={handleTimeout}>
        <IoIosClose />
      </Button>
    </ToastDefault>
  );
};

export default ToastWrapper;
