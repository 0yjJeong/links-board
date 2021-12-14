import styled from 'styled-components';
import { StackDefault, CanvasWrapper, ListsWrapper } from '../../components';

export const Board = () => {
  const onDragEnd = () => {};

  return (
    <Wrapper axis='column'>
      <Header axis='column' spacing='medium'></Header>
      <CanvasWrapper onDragEnd={onDragEnd}>
        <ListsWrapper />
      </CanvasWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(StackDefault)`
  background: ${(p) => p.theme.palette.grey[0]};
  display: flex;
  flex-direction: column;
`;

const Header = styled(StackDefault)`
  height: 8.4rem;
`;
