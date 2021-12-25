import styled from 'styled-components';
import { Font, Palette } from '../../../constants/theme';

export interface TextDefaultProps {
  font: keyof Font;
  color: keyof Palette;
}

export const TextDefault = styled.p<TextDefaultProps>`
  margin: 0;
  position: relative;
  color: ${(p) => p.theme.palette[p.color]};
  font-size: ${(p) => p.theme.font[p.font].size}px;
  font-weight: ${(p) => p.theme.font[p.font].weight};
  white-space: pre-line;
  width: 100%;
  display: flex;
  align-items: center;

  & + & {
    margin-top: ${(p) => p.theme.spacing['small']}px;
  }
`;
