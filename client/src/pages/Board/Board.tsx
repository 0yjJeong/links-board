import styled from 'styled-components';
import { BiLink } from 'react-icons/bi';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import {
  CanvasWrapper as Canvas,
  ListDefault as List,
  ListInnerDefault as ListInner,
  CardWrapper as Card,
  UI,
} from '../../components';

export const Board = () => {
  const onDragEnd = () => {};

  return (
    <Wrapper axis='column'>
      <Header axis='column' spacing='medium'>
        <UI.Stack justify='space-between'>
          <UI.Stack>
            <UI.Buttons.Outline>
              <BiLink />
              code
            </UI.Buttons.Outline>
          </UI.Stack>
          <UI.Stack gap='small'>
            <UI.Buttons.Fill>
              <HiOutlineDocumentAdd />
              New
            </UI.Buttons.Fill>
            <UI.Buttons.Fill>
              <MdDelete />
              Delete
            </UI.Buttons.Fill>
          </UI.Stack>
        </UI.Stack>
        <UI.Stack>
          <UI.Input theme='title1' placeholder='Links board' />
        </UI.Stack>
      </Header>
      <Canvas UI={UI} onDragEnd={onDragEnd}>
        <>
          {[{ id: '1' }, { id: '2' }, { id: '3' }].map((list, index) => (
            <List key={list.id} id={list.id} index={index}>
              <ListInner id={list.id} UI={UI} Card={Card} />
            </List>
          ))}
        </>
      </Canvas>
    </Wrapper>
  );
};

const Wrapper = styled(UI.Stack)`
  background: ${(p) => p.theme.palette['grey0']};
  display: flex;
  flex-direction: column;
`;

const Header = styled(UI.Stack)`
  height: 3.4rem;
`;
