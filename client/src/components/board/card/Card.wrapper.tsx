import { Draggable } from 'react-beautiful-dnd';
import { BiTrash } from 'react-icons/bi';
import { HiOutlineExternalLink } from 'react-icons/hi';
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
            <Stack gap='large'>
              <Text font='body2' color='grey4'>
                <Link href={card.url} target='_blank' rel='noreferrer'>
                  <HiOutlineExternalLink
                    style={{
                      marginBottom: '-2px',
                      paddingRight: '2px',
                    }}
                  />
                  {card.url}
                </Link>
              </Text>
              <Button themeName='transperent' onClick={handleDeleteCard}>
                <BiTrash />
              </Button>
            </Stack>
            {card.data.image && (
              <Stack>
                <Image imageURL={card.data.image} />
              </Stack>
            )}
            <Stack axis='column'>
              <Text font='subtitle' color='grey5'>
                {safe(
                  () => limitTextLength(card.data.title, 96),
                  'Undefined title'
                )}
              </Text>
              <Text font='body1' color='grey4'>
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
