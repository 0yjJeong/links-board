import styled from 'styled-components';
import { ListInnerDefault } from '../';

export const ListDefaultOuter = styled.div`
  width: 340px;
  flex: 0 0 auto;
`;

export const ListDefaultInner = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  background: ${(p) => p.theme.palette.grey[2]};
`;

export const ListDefault = () => {
  const children = <ListInnerDefault />;

  return (
    <ListDefaultOuter>
      <ListDefaultInner>{children}</ListDefaultInner>
    </ListDefaultOuter>
  );
};
