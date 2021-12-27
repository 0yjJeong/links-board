import styled from 'styled-components';

export const CardInnerDefault = styled.div`
  div {
    &:first-child {
      border-bottom: 1px solid ${(p) => p.theme.palette['grey1']};
    }

    &:nth-child(3) {
      margin-top: ${(p) => p.theme.spacing['small']}px;
    }
  }
`;
