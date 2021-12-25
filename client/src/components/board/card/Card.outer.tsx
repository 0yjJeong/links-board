import styled from 'styled-components';

export const CardOuterDefault = styled.div`
  background: #fff;
  margin-bottom: ${(p) => p.theme.spacing['normal']}px;
  border-radius: ${(p) => p.theme.radii['small']}px;

  &:last-child {
    margin-bottom: 0;
  }
`;
