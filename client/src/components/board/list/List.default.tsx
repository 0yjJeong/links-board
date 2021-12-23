import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { ListInner } from '..';
import { Card, Element, List, TitleProps } from '../../../types';

export const ListDefaultOuter = styled.div`
  width: 340px;
  flex: 0 0 auto;
`;

export const ListDefaultInner = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  background: ${(p) => p.theme.palette['grey1']};
  border-radius: ${(p) => p.theme.radii['small']}px;
`;

export interface ListDefaultProps {
  index: number;
  list: List;
  cards: Card[] | undefined;
  editTitle: (payload: TitleProps) => void;
  deleteElement: (payload: Element) => void;
  addElement: (payload: Element) => void;
}

const ListDefault = ({
  index,
  list,
  cards,
  editTitle,
  deleteElement,
  addElement,
}: ListDefaultProps) => {
  const children = (
    <ListInner
      index={index}
      list={list}
      cards={cards}
      editTitle={editTitle}
      deleteElement={deleteElement}
      addElement={addElement}
    />
  );

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <ListDefaultOuter ref={provided.innerRef}>
          <ListDefaultInner
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            {children}
          </ListDefaultInner>
        </ListDefaultOuter>
      )}
    </Draggable>
  );
};

export default ListDefault;
