import React from 'react';
import { TextDefault, TextDefaultProps } from '../..';

type TextWrapperProps = React.HTMLAttributes<HTMLParagraphElement> &
  TextDefaultProps;

const TextWrapper = ({ ...rest }: TextWrapperProps) => {
  return <TextDefault {...rest} />;
};

export default TextWrapper;
