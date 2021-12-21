import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

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
  id: string;
  index: number;
  children: React.ReactElement;
}

const ListDefault = ({ id, index, children }: ListDefaultProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <ListDefaultOuter
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <ListDefaultInner>{children}</ListDefaultInner>
        </ListDefaultOuter>
      )}
    </Draggable>
  );
};

export default ListDefault;
