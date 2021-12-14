import styled from 'styled-components';

export interface CanvasInnerProps {
  ref: (element: HTMLElement | null) => any;
}

export const CanvasInner = styled.div<CanvasInnerProps>`
  display: flex;
  gap: 0.6rem;
  position: absolute;
  white-space: nowrap;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: hidden;
`;
