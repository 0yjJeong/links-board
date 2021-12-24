import React from 'react';
import { InputDefault, InputDefaultProps } from './Input.default';

type InputWrapperProps = React.InputHTMLAttributes<HTMLInputElement> &
  InputDefaultProps;

const InputWrapper = React.forwardRef(
  (
    { ...rest }: InputWrapperProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return <InputDefault {...rest} ref={ref} />;
  }
);

export default InputWrapper;
