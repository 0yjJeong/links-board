import { HTMLAttributes } from 'react';
import styled, { CSSProperties } from 'styled-components';

interface StackDefaultProps extends HTMLAttributes<HTMLDivElement> {
  axis?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
}

const StackBase = styled.div<StackDefaultProps>`
  height: inherit;
  display: flex;
  flex-direction: ${(p) => p.axis};
  justify-content: ${(p) => p.justify};
  align-items: ${(p) => p.align};
`;

export const StackDefault = ({ children, ...rest }: StackDefaultProps) => {
  return <StackBase {...rest}>{children}</StackBase>;
};
