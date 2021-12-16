import React from 'react';
import styled, { CSSProperties } from 'styled-components';
import { Palette, Sizing } from '../../../constants/theme';

export type InputCSS = {
  _size?: keyof Sizing['font'];
  _color?: keyof Palette;
  _placeholder?: keyof Palette;
  _weight?: CSSProperties['fontWeight'];
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

interface InputDefaultProps {
  css: InputCSS;
}

export const InputDefault = styled.input<InputDefaultProps>`
  border: none;
  width: 100%;
  background: inherit;
  outline: none;
  padding: 0;
  font-size: ${(p) => p.theme.sizing.font[p.css._size!]}px;
  color: ${(p) => p.theme.palette[p.css._color!]};
  font-weight: ${(p) => p.css._weight};

  &::placeholder {
    color: ${(p) => p.theme.palette[p.css._placeholder!]};
  }
`;
