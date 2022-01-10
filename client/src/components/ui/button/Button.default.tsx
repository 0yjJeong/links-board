import styled from 'styled-components';
import { Palette, Font, Spacing } from '../../../constants/theme';

export type ButtonStyle = {
  font: keyof Font;
  color: keyof Palette;
  background: keyof Palette | null;
  border: keyof Palette | null;
  hoverd: keyof Palette | null;
};

type ButtonSeries = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

export const buttonSeriesMap: { [key in ButtonSeries]: ButtonStyle } = {
  primary: {
    color: 'grey4',
    font: 'subtitle',
    hoverd: 'grey3',
    border: null,
    background: 'grey2',
  },
  secondary: {
    color: 'grey4',
    font: 'subtitle',
    hoverd: 'grey1',
    border: 'grey1',
    background: null,
  },
  tertiary: {
    color: 'grey4',
    font: 'subtitle',
    hoverd: 'grey2',
    border: null,
    background: null,
  },
  quaternary: {
    color: 'blue1',
    font: 'subtitle',
    hoverd: 'blue0',
    border: 'blue1',
    background: null,
  },
};

export interface ButtonDefaultProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  series?: ButtonSeries;
  spacing?: keyof Spacing;
  colorTheme?: keyof Palette;
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
    const buttonSeries = buttonSeriesMap[p.series || 'primary'];

    let buttonCSS = `
    color: ${p.theme.palette[buttonSeries.color]};
    font-size: ${p.theme.font[buttonSeries.font].size}px;
    font-weight: ${p.theme.font[buttonSeries.font].weight};
    `;

    buttonSeries.hoverd &&
      (buttonCSS += `
    &:hover {
      background: ${p.theme.palette[buttonSeries.hoverd]};
    }
  `);

    buttonSeries.background &&
      (buttonCSS += `
    background: ${p.theme.palette[buttonSeries.background]};
    `);

    buttonSeries.border &&
      (buttonCSS += `
    border: 1px solid ${p.theme.palette[buttonSeries.border]};
    `);

    return buttonCSS;
  }}
`;

export default ButtonDefault;
