import styled from 'styled-components';
import { StackDefault } from '..';

interface ListInnerDefaultProps {}

const Body = styled.div``;

export const ListInnerDefault = ({}: ListInnerDefaultProps) => {
  return (
    <>
      <StackDefault></StackDefault>
      <Body></Body>
      <StackDefault></StackDefault>
    </>
  );
};
