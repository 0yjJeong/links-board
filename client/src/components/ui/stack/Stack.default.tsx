import { HTMLAttributes } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { Spacing } from '../../../constants/theme';

interface StackDefaultProps extends HTMLAttributes<HTMLDivElement> {
  axis?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  gap?: keyof Spacing;
  spacing?: keyof Spacing;
}

const StackBase = styled.div<StackDefaultProps>`
  height: 100%;
  display: flex;
  flex-direction: ${(p) => p.axis};
  justify-content: ${(p) => p.justify};
  align-items: ${(p) => p.align};
  gap: ${(p) => p.gap && p.theme.spacing[p.gap]}px;
  padding: ${(p) => p.spacing && p.theme.spacing[p.spacing]}px;
`;

export const StackDefault = ({ children, ...rest }: StackDefaultProps) => {
  return <StackBase {...rest}>{children}</StackBase>;
};
