import { useCallback, useMemo } from 'react';
import { BoardAPI, BoardProps, BoardTemplate } from '.';
import { Card, Dragged, Element, TitleProps } from '../../types';

export const BoardPageSaved = ({
  title,
  lists,
  cards,
  addElement,
  deleteElement,
  editTitle,
  dragHappened,
}: BoardProps) => {
  const groupedCardsMap = useMemo(
    () =>
      cards.reduce((obj, c) => {
        try {
          obj[c.attachedTo].push(c);
        } catch (err) {
          obj[c.attachedTo] = [c];
        }
        return obj;
      }, {} as { [key: string]: Card[] }),
    [cards]
  );

  const onAddElement = useCallback(
    (payload: Element) => addElement(payload),
    [addElement]
  );

  const onDeleteElement = useCallback(
    (payload: Element) => deleteElement(payload),
    [deleteElement]
  );

  const onEditTitle = useCallback(
    (payload: TitleProps) => editTitle(payload),
    [editTitle]
  );

  const onDragHappened = useCallback(
    (payload: Dragged) => dragHappened(payload),
    [dragHappened]
  );

  return (
    <BoardAPI>
      <BoardTemplate
        title={title}
        lists={lists}
        groupedCardsMap={groupedCardsMap}
        onAddElement={onAddElement}
        onEditTitle={onEditTitle}
        onDragHappened={onDragHappened}
        onDeleteElement={onDeleteElement}
      />
    </BoardAPI>
  );
};
