import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { HiMinus } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import { Card, Stack, Input, ButtonFill, ButtonStretch } from '../../';
import { ListDefaultProps } from '../list/List.default';

export interface ListInnerDefaultProps extends ListDefaultProps {}

const Body = styled.div`
  overflow-y: auto;
  padding-left: ${(p) => p.theme.spacing['normal']}px;
  padding-right: ${(p) => p.theme.spacing['normal']}px;
`;

const ListInnerDefault = ({
  list,
  cards = [],
  editTitle,
  deleteElement,
}: ListInnerDefaultProps) => {
  return (
    <>
      <Stack spacing='normal'>
        <Input
          theme='subTitle'
          placeholder='List title'
          value={list.title}
          onChange={(e) =>
            editTitle({
              id: list.id,
              title: e.target.value,
            })
          }
        />
        <ButtonFill>
          <HiMinus onClick={() => deleteElement(list)} />
        </ButtonFill>
      </Stack>
      <Droppable droppableId={list.id} type='card'>
        {(provided) => (
          <Body ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Card key={card.id} id={card.id} index={index} />
            ))}
            {provided.placeholder}
          </Body>
        )}
      </Droppable>
      <Stack spacing='normal'>
        <ButtonStretch>
          <IoMdAdd />
          <span> Add a link</span>
        </ButtonStretch>
      </Stack>
    </>
  );
};

export default ListInnerDefault;
