const theme = {
  palette: {
    grey: ['#F9F9F9', '#F3F3F3', '#EBEBEB', '#DDDDDD', '#A4A4A4', '#3E3E3E'],
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

export type Spacing = typeof theme['spacing'];
export type Sizing = typeof theme['sizing'];
export type Radii = typeof theme['radii'];

export default theme;
