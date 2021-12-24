import styled from 'styled-components';

export const CardOuterDefault = styled.div`
  height: 300px;
  background: #fff;
  margin-bottom: ${(p) => p.theme.spacing['normal']}px;

  &:last-child {
    margin-bottom: 0;
  }
`;
