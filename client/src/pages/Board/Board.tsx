import styled from 'styled-components';
import { StackDefault, CanvasWrapper } from '../../components';

export const Board = () => {
  const onDragEnd = () => {};

  return (
    <Wrapper axis='column'>
      <Header axis='column'></Header>
      <CanvasWrapper onDragEnd={onDragEnd} />
    </Wrapper>
  );
};

const Wrapper = styled(StackDefault)``;

const Header = styled(StackDefault)``;
