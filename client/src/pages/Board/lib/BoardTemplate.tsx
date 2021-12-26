import styled from 'styled-components';
import { BiLink } from 'react-icons/bi';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { Canvas, Column, Stack, Input, Button } from '../../../components';
import { Card, Dragged, Element, List, TitleProps } from '../../../types';
import { safe } from '../../../utils';

const Wrapper = styled(Stack)`
  background: ${(p) => p.theme.palette['grey0']};
  display: flex;
  flex-direction: column;
`;

const Header = styled(Stack)`
  height: 3.4rem;
`;

export interface BoardTemplateProps {
  title: string;
  lists: List[];
  groupedCardsMap: { [key: string]: Card[] };
  onAddElement: (payload: Element) => void;
  onEditTitle?: (payload: TitleProps) => void;
  onDragHappened?: (payload: Dragged) => void;
  onDeleteElement?: (payload: Element) => void;
}

export const BoardTemplate = ({
  title,
  lists,
  groupedCardsMap,
  onAddElement,
  onEditTitle = () => {},
  onDragHappened = () => {},
  onDeleteElement = () => {},
}: BoardTemplateProps) => (
  <Wrapper axis='column' gap='medium'>
    <Header axis='column' spacing='medium' gap='small'>
      <Stack justify='space-between'>
        <Stack>
          <Button themeName='outline'>
            <BiLink />
            code
          </Button>
        </Stack>
        <Stack gap='small'>
          <Button themeName='fill'>
            <HiOutlineDocumentAdd />
            New
          </Button>
          <Button themeName='fill'>
            <MdDelete />
            Delete
          </Button>
        </Stack>
      </Stack>
      <Stack>
        <Input
          color='grey5'
          placeholderColor='grey3'
          font='title1'
          placeholder='Links board'
          value={title}
        />
      </Stack>
    </Header>
    <Canvas onDragHappened={onDragHappened} onAddElement={onAddElement}>
      <>
        {lists.map((list, index) => (
          <Column
            key={list.id}
            index={index}
            list={list}
            cards={safe(() => groupedCardsMap[list.id], [])}
            onEditTitle={onEditTitle}
            onDeleteElement={onDeleteElement}
            onAddElement={onAddElement}
          />
        ))}
      </>
    </Canvas>
  </Wrapper>
);
