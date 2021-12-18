import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { ListInnerDefault } from '..';

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
}

export const ListDefault = ({ id, index }: ListDefaultProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <ListDefaultOuter
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <ListDefaultInner>
            <ListInnerDefault id={id} />
          </ListDefaultInner>
        </ListDefaultOuter>
      )}
    </Draggable>
  );
};
