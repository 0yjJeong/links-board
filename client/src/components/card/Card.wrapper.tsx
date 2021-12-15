import { Draggable } from 'react-beautiful-dnd';
import { CardDefault } from './Card.default';

export interface CardWrapperProps {
  id: string;
  index: number;
}

export const CardWrapper = ({ id, index }: CardWrapperProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <CardDefault
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {id}
        </CardDefault>
      )}
    </Draggable>
  );
};
