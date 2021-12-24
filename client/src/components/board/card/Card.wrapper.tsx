import { Draggable } from 'react-beautiful-dnd';
import { CardOuterDefault, CardInnerDefault } from '../..';
import { Card } from '../../../types';

export interface CardWrapperProps {
  card: Card;
  index: number;
}

const CardWrapper = ({ card, index }: CardWrapperProps) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <CardOuterDefault
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <CardInnerDefault></CardInnerDefault>
        </CardOuterDefault>
      )}
    </Draggable>
  );
};

export default CardWrapper;
