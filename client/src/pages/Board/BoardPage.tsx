import styled from 'styled-components';
import { BiLink } from 'react-icons/bi';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import {
  Canvas,
  List,
  Stack,
  Input,
  ButtonFill,
  ButtonOutline,
} from '../../components';
import { BoardPageDefaultProps, BoardPageWrapper } from '.';
import { Card } from '../../types';

const BoardPageDefault = styled(Stack)`
  background: ${(p) => p.theme.palette['grey0']};
  display: flex;
  flex-direction: column;
`;

const Header = styled(Stack)`
  height: 3.4rem;
`;

export const Board = ({
  title,
  lists,
  cards,
  addElement,
  deleteElement,
  editTitle,
  dragHappened,
}: BoardPageDefaultProps) => {
  const groupedCardsMap = cards.reduce((obj, c) => {
    try {
      obj[c.attachedTo].push(c);
    } catch (err) {
      obj[c.attachedTo] = [c];
    }
    return obj;
  }, {} as { [key: string]: Card[] });

  return (
    <BoardPageDefault axis='column' gap='medium'>
      <Header axis='column' spacing='medium' gap='small'>
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
          <Input
            theme='title1'
            placeholder='Links board'
            value={title}
            onChange={(e) => editTitle({ title: e.target.value })}
          />
        </Stack>
      </Header>
      <Canvas dragHappened={dragHappened} addElement={addElement}>
        <>
          {lists.map((list, index) => (
            <List
              key={list.id}
              index={index}
              list={list}
              cards={groupedCardsMap[list.id]}
              editTitle={editTitle}
              deleteElement={deleteElement}
            />
          ))}
        </>
      </Canvas>
    </BoardPageDefault>
  );
};

export const BoardPage = () => <BoardPageWrapper Component={Board} />;
