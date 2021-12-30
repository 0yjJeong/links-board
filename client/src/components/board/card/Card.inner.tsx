import styled from 'styled-components';

export const CardInnerDefault = styled.div`
  div {
    &:first-child {
      border-bottom: 1px solid ${(p) => p.theme.palette['grey1']};
    }
  }
`;
