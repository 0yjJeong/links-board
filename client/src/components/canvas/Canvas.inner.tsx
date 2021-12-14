import styled from 'styled-components';

export interface CanvasInnerProps {
  ref: (element: HTMLElement | null) => any;
}

export const CanvasInner = styled.div<CanvasInnerProps>``;
