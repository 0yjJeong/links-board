import styled from 'styled-components';

export const CardInnerDefault = styled.div`
  padding: ${(p) => p.theme.spacing['normal']}px;

  & > div {
    &:nth-child(2),
    &:nth-child(3) {
      margin-top: ${(p) => p.theme.spacing['normal']}px;
    }
  }
`;
