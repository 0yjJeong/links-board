import { StackDefault } from './stack';
import { InputWrapper } from './input';
import * as Buttons from './button';

export type IUI = typeof UI;

export const UI = {
  Stack: StackDefault,
  Input: InputWrapper,
  Buttons: {
    Fill: Buttons.ButtonFillWrapper,
    Outline: Buttons.ButtonOutlineWrapper,
    Stretch: Buttons.ButtonStretchWrapper,
  },
};
