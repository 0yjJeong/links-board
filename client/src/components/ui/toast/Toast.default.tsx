import styled from 'styled-components';

export const ToastDefault = styled.div`
  position: fixed;
  left: 50%;
  top: ${(p) => p.theme.spacing['medium']}px;
  max-width: 260px;
  min-width: 260px;
  transform: translateX(-50%);
  font-size: ${(p) => p.theme.font['body2'].size}px;
  background: ${(p) => p.theme.palette['grey5']};
  color: ${(p) => p.theme.palette['grey0']};
  padding-top: ${(p) => p.theme.spacing['large']}px;
  padding-bottom: ${(p) => p.theme.spacing['large']}px;
  padding-left: ${(p) => p.theme.spacing['large']}px;
  padding-right: ${(p) => p.theme.spacing['normal']}px;
  border-radius: ${(p) => p.theme.radii['small']}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
