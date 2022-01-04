import styled from 'styled-components';
import { Font, Palette } from '../../../constants/theme';

export interface InputDefaultProps {
  color: keyof Palette;
  placeholderColor: keyof Palette;
  font: keyof Font;
}

export const InputDefault = styled.input<InputDefaultProps>`
  border: none;
  width: 100%;
  background: inherit;
  outline: none;
  font-size: ${(p) => p.theme.font[p.font].size}px;
  color: ${(p) => p.theme.palette[p.color]};
  font-weight: ${(p) => p.theme.font[p.font].weight};
  min-height: 24px;

  &::placeholder {
    color: ${(p) => p.theme.palette[p.placeholderColor]};
  }
`;
