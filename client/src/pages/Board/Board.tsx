import styled from 'styled-components';
import { StackDefault, CanvasWrapper } from '../../components';

export const Board = () => {
  const onDragEnd = () => {};

  return (
    <Wrapper axis='column'>
      <Header axis='column' spacing='medium'>
        Headre
      </Header>
      <CanvasWrapper onDragEnd={onDragEnd} />
    </Wrapper>
  );
};

const Wrapper = styled(StackDefault)`
  background: ${(p) => p.theme.palette.grey[0]};
`;

const Header = styled(StackDefault)``;
