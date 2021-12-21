import styled from 'styled-components';

export const CanvasInner = styled.div`
  display: flex;
  gap: 0.6rem;
  position: absolute;
  white-space: nowrap;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: hidden;
  padding-right: ${(p) => p.theme.spacing['large']}px;
  padding-left: ${(p) => p.theme.spacing['medium']}px;
  padding-bottom: ${(p) => p.theme.spacing['large']}px;
`;
