import { Draggable } from 'react-beautiful-dnd';
import { BiTrash } from 'react-icons/bi';
import {
  Image,
  Text,
  CardOuterDefault,
  CardInnerDefault,
  Stack,
  Link,
  Button,
} from '../..';
import { Card, Element } from '../../../types';
import { limitTextLength, safe } from '../../../utils';

export interface CardWrapperProps {
  card: Card;
  index: number;
  onDeleteElement: (payload: Element) => void;
}

const CardWrapper = ({ card, index, onDeleteElement }: CardWrapperProps) => {
  const handleDeleteCard = () => {
    onDeleteElement(card);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <CardOuterDefault
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <CardInnerDefault>
            <Stack spacing='normal'>
              <Text font='body2' color='grey5' justify='start'>
                <Link href={card.url} target='_blank' rel='noreferrer'>
                  {card.url}
                </Link>
              </Text>
              <Button themeName='transperent1' onClick={handleDeleteCard}>
                <BiTrash />
              </Button>
            </Stack>
            {card.data.image && (
              <Stack spacing='normal'>
                <Image imageURL={card.data.image} radii='small' />
              </Stack>
            )}
            <Stack axis='column' spacing='normal'>
              <Text font='subtitle' color='grey5' justify='start'>
                {safe(
                  () => limitTextLength(card.data.title, 96),
                  'Undefined title'
                )}
              </Text>
              <Text font='body1' color='grey4' justify='start'>
                {safe(
                  () => limitTextLength(card.data.description, 190),
                  'This link does not contain description.'
                )}
              </Text>
            </Stack>
          </CardInnerDefault>
        </CardOuterDefault>
      )}
    </Draggable>
  );
};

export default CardWrapper;
