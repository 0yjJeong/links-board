import styled from 'styled-components';
import { BiLink } from 'react-icons/bi';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  Canvas,
  List,
  ListInner,
  Stack,
  Input,
  ButtonFill,
  ButtonOutline,
} from '../../components';

export const Board = () => {
  const title = useSelector((state: RootState) => state.board.title);

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
          <Input theme='title1' placeholder='Links board' value={title} />
        </Stack>
      </Header>
      <Canvas onDragEnd={onDragEnd}>
        <>
          {[{ id: '1' }, { id: '2' }, { id: '3' }].map((list, index) => (
            <List key={list.id} id={list.id} index={index}>
              <ListInner id={list.id} />
            </List>
          ))}
        </>
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
