import styled from 'styled-components';
import { Palette, Font } from '../../../constants/theme';

export type ButtonStyle = {
  font: keyof Font;
  color: keyof Palette;
  background: keyof Palette | null;
  border: keyof Palette | null;
  hoverd: keyof Palette;
};

type ButtonTheme = 'fill' | 'transperent' | 'outline';

export const buttonThemeMap: { [key in ButtonTheme]: ButtonStyle } = {
  fill: {
    color: 'grey4',
    font: 'subtitle',
    hoverd: 'grey3',
    border: null,
    background: 'grey2',
  },
  outline: {
    color: 'grey5',
    font: 'subtitle',
    border: 'grey3',
    background: null,
    hoverd: 'grey1',
  },
  transperent: {
    color: 'grey4',
    font: 'subtitle',
    hoverd: 'grey2',
    border: null,
    background: null,
  },
};

export interface ButtonDefaultProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  themeName?: ButtonTheme;
}

const ButtonDefault = styled.button<ButtonDefaultProps>`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: none;
  gap: ${(p) => p.theme.spacing['small']}px;
  border-radius: ${(p) => p.theme.radii['small']}px;
  padding: ${(p) => p.theme.spacing['small']}px;

  ${(p) => {
    const buttonTheme = p.themeName
      ? buttonThemeMap[p.themeName]
      : buttonThemeMap['fill'];

    let buttonCSS = `
    color: ${p.theme.palette[buttonTheme.color]};

    &:hover {
      background: ${p.theme.palette[buttonTheme.hoverd]};
    }
    `;

    buttonTheme.background &&
      (buttonCSS += `
    background: ${p.theme.palette[buttonTheme.background]};
    `);

    buttonTheme.border &&
      (buttonCSS += `
    border: 1px solid ${p.theme.palette[buttonTheme.border]};
    `);

    return buttonCSS;
  }}
`;

export default ButtonDefault;
