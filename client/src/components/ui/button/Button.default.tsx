import styled from 'styled-components';
import { Palette, Font, Spacing } from '../../../constants/theme';
import { safe } from '../../../utils';

export type ButtonStyle = {
  font: keyof Font;
  color: keyof Palette;
  background: keyof Palette | null;
  border: keyof Palette | null;
  hoverd: keyof Palette | null;
};

type ButtonTheme =
  | 'fill'
  | 'transperent1'
  | 'transperent2'
  | 'outline'
  | 'main';

export const buttonThemeMap: { [key in ButtonTheme]: ButtonStyle } = {
  fill: {
    color: 'grey4',
    font: 'subtitle',
    hoverd: 'grey3',
    border: null,
    background: 'grey2',
  },
  outline: {
    color: 'blue0',
    font: 'subtitle',
    border: 'blue1',
    background: null,
    hoverd: null,
  },
  transperent1: {
    color: 'grey4',
    font: 'subtitle',
    hoverd: 'grey2',
    border: null,
    background: null,
  },
  transperent2: {
    color: 'grey4',
    font: 'subtitle',
    hoverd: null,
    border: null,
    background: null,
  },
  main: {
    color: 'grey0',
    font: 'title2',
    hoverd: 'blue3',
    border: null,
    background: 'blue2',
  },
};

export interface ButtonDefaultProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  themeName?: ButtonTheme;
  spacing?: keyof Spacing;
}

const ButtonDefault = styled.button<ButtonDefaultProps>`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: none;
  gap: ${(p) => p.theme.spacing['small']}px;
  border-radius: ${(p) => p.theme.radii['small']}px;
  padding: ${(p) => p.theme.spacing[p.spacing || 'small']}px;

  ${(p) => {
    const buttonTheme = p.themeName
      ? buttonThemeMap[p.themeName]
      : buttonThemeMap['fill'];

    let buttonCSS = `
    color: ${p.theme.palette[buttonTheme.color]};
    font-size: ${p.theme.font[buttonTheme.font].size}px;
    font-weight: ${p.theme.font[buttonTheme.font].weight};
    `;

    buttonTheme.hoverd &&
      (buttonCSS += `
    &:hover {
      background: ${p.theme.palette[buttonTheme.hoverd]};
    }
  `);

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
