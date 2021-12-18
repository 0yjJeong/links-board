import styled from 'styled-components';
import { Sizing, Palette } from '../../../constants/theme';

export type ButtonStyle = {
  size: keyof Sizing['font'];
  color: keyof Palette;
  background: keyof Palette | null;
  border: keyof Palette | null;
  hoverd: keyof Palette;
};

export interface ButtonDefaultProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: ButtonStyle;
}

export const ButtonDefault = styled.button<ButtonDefaultProps>`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing['small']}px;
  border-radius: ${(p) => p.theme.radii['small']}px;
  padding: ${(p) => p.theme.spacing['small']}px;
  color: ${(p) => p.theme.palette[p.buttonStyle!.color]};
  background: ${(p) =>
    p.buttonStyle!.background
      ? p.theme.palette[p.buttonStyle!.background]
      : 'none'};
  border: ${(p) =>
    p.buttonStyle!.border &&
    `1px solid ${p.theme.palette[p.buttonStyle!.border]}`};

  &:hover {
    background: ${(p) => p.theme.palette[p.buttonStyle!.hoverd]};
  }
`;
