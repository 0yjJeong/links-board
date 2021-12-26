import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { ListInner } from '..';
import { Card, Element, List, TitleProps } from '../../../types';

export const ColumnDefaultOuter = styled.div`
  width: 340px;
  flex: 0 0 auto;
`;

export const ColumnDefaultInner = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  background: ${(p) => p.theme.palette['grey1']};
  border-radius: ${(p) => p.theme.radii['small']}px;
`;

export interface ColumnDefaultProps {
  index: number;
  list: List;
  cards: Card[];
  onEditTitle: (payload: TitleProps) => void;
  onDeleteElement: (payload: Element) => void;
  onAddElement: (payload: Element) => void;
}

const ColumnDefault = ({
  index,
  list,
  cards,
  onEditTitle,
  onDeleteElement,
  onAddElement,
}: ColumnDefaultProps) => {
  const children = (
    <ListInner
      index={index}
      list={list}
      cards={cards}
      onEditTitle={onEditTitle}
      onDeleteElement={onDeleteElement}
      onAddElement={onAddElement}
    />
  );

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <ColumnDefaultOuter ref={provided.innerRef}>
          <ColumnDefaultInner
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            {children}
          </ColumnDefaultInner>
        </ColumnDefaultOuter>
      )}
    </Draggable>
  );
};

export default ColumnDefault;
