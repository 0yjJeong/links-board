import styled from 'styled-components';
import { BiLink } from 'react-icons/bi';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import {
  StackDefault as Stack,
  CanvasWrapper as Canvas,
  ListsWrapper as Lists,
  ListDefault as List,
  ListInnerDefault as ListInner,
  CardWrapper as Card,
  InputWrapper as Input,
  ButtonOutlineWrapper as ButtonOutline,
  ButtonFillWrapper as ButtonFill,
} from '../../components';

export const Board = () => {
  const onDragEnd = () => {};

  return (
    <Wrapper axis='column'>
      <Header axis='column' spacing='medium'>
        <Stack justify='space-between'>
          <Stack>
            <ButtonOutline>
              <BiLink />
              code
            </ButtonOutline>
          </Stack>
          <Stack gap='small'>
            <ButtonFill>
              <HiOutlineDocumentAdd />
              New
            </ButtonFill>
            <ButtonFill>
              <MdDelete />
              Delete
            </ButtonFill>
          </Stack>
        </Stack>
        <Stack>
          <Input theme='title1' placeholder='Links board' />
        </Stack>
      </Header>
      <Canvas onDragEnd={onDragEnd}>
        <Lists List={List} ListInner={ListInner} Card={Card} />
      </Canvas>
    </Wrapper>
  );
};

const Wrapper = styled(Stack)`
  background: ${(p) => p.theme.palette['grey0']};
  display: flex;
  flex-direction: column;
`;

const Header = styled(Stack)`
  height: 3.4rem;
`;
