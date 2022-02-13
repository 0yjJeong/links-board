import styled from 'styled-components';

interface ToastDefaultProps {
  color: string;
}

export const ToastDefault = styled.div<ToastDefaultProps>`
  overflow: hidden;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  display: flex;
  gap: ${(p) => p.theme.spacing['normal']}px;
  width: calc(100% - ${(p) => p.theme.spacing['medium'] * 4}px);
  background: ${(p) => p.theme.palette['grey5']};
  color: #fff;
  top: ${(p) => p.theme.spacing['medium']}px;
  padding: ${(p) => p.theme.spacing['medium']}px;

  > * {
    &:first-child {
      margin-left: 10px;
    }
  }

  &:before {
    display: block;
    content: '';
    width: 10px;
    background: ${(p) => p.color};
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
  }
`;
