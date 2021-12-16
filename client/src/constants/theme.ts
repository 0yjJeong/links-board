const theme = {
  palette: {
    grey0: '#F9F9F9',
    grey1: '#F3F3F3',
    grey2: '#EBEBEB',
    grey3: '#DDDDDD',
    grey4: '#A4A4A4',
    grey5: '#3E3E3E',
  },
  spacing: {
    small: 4,
    normal: 8,
    medium: 12,
    large: 16,
  },
  sizing: {
    button: {
      small: 38,
      normal: 48,
      large: 60,
    },
    font: {
      title1: 24,
      title2: 20,
      subtitle: 18,
      body: 14,
    },
  },
  radii: {
    small: 5,
    normal: 30,
    large: 48,
  },
};

export type Palette = typeof theme['palette'];
export type Spacing = typeof theme['spacing'];
export type Sizing = typeof theme['sizing'];
export type Radii = typeof theme['radii'];

export default theme;
