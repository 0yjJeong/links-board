import { useCallback, useMemo, ChangeEvent } from 'react';
import { useParams } from 'react-router';
import { BoardAPI, BoardProps, BoardTemplate } from '..';
import { Card, Dragged, Element, TitleProps } from '../../types';
import { updateBoard, scrapUrl } from '../../lib/api';
import { getElementKey, updateCards, updateLists } from '../../utils/board';

export const BoardPageSaved = ({
  title,
  lists: prevLists,
  cards: prevCards,
  updateElements,
  editTitle,
  dragHappened,
  setToast,
}: BoardProps) => {
  const { code } = useParams();

  const groupedCardsMap = useMemo(
    () =>
      prevCards.reduce((obj, c) => {
        try {
          obj[c.attachedTo].push(c);
        } catch (err) {
          obj[c.attachedTo] = [c];
        }
        return obj;
      }, {} as { [key: string]: Card[] }),
    [prevCards]
  );

  const onAddElement = useCallback(
    async (payload: Element) => {
      if (code) {
        try {
          const key = getElementKey(payload);

          let arr =
            key === 'lists' ? [prevLists, prevCards] : [prevCards, prevLists];

          let nextElements = [...arr[0], payload];

          await updateBoard(code, {
            elements: [...arr[1], ...nextElements],
          });

          updateElements(nextElements);
        } catch (err) {
          setToast('Failed to save item. Please try again.');
        }
      }
    },
    [code, prevLists, prevCards, updateElements, setToast]
  );

  const onDeleteElement = useCallback(
    async (payload: Element) => {
      if (code) {
        try {
          const key = getElementKey(payload);

          let arr =
            key === 'lists' ? [prevLists, prevCards] : [prevCards, prevLists];

          const index = arr[0].findIndex(
            (element) => element.id === payload.id
          );

          const nextElements = [
            ...arr[0].slice(0, index),
            ...arr[0].slice(index + 1),
          ];

          updateElements(nextElements);

          await updateBoard(code, {
            elements: [...arr[1], ...nextElements],
          });
        } catch (err) {
          setToast('Failed to delete item. Please try again.');
        }
      }
    },
    [code, prevLists, prevCards, updateElements, setToast]
  );

  const onEditTitle = useCallback(
    (payload: TitleProps) => editTitle(payload),
    [editTitle]
  );

  const onInputBlurred = useCallback(
    async (payload: ChangeEvent<HTMLInputElement>) => {
      if (code) {
        try {
          let body = {};

          payload.target.name === 'title'
            ? (body = {
                title: payload.target.value,
              })
            : (body = {
                elements: [...prevCards, ...prevLists],
              });

          await updateBoard(code, body);
        } catch (err) {
          setToast('Failed to save input. Please try again.');
        }
      }
    },
    [code, prevCards, prevLists, setToast]
  );

  const onDragHappened = useCallback(
    async (payload: Dragged) => {
      if (code) {
        try {
          let elements: Element[] = [];
          const { type, elementId, startIndex, endId, endIndex } = payload;

          if (type === 'list') {
            elements = updateLists(prevLists, startIndex, endIndex);
          } else if (type === 'card') {
            elements = updateCards(prevCards, elementId, endId, endIndex);
          }

          if (elements.length) {
            dragHappened(elements);
          }

          const key = getElementKey(elements[0]);

          await updateBoard(code, {
            elements:
              key === 'lists'
                ? [...prevCards, ...elements]
                : [...prevLists, ...elements],
          });
        } catch (err) {
          setToast('Failed to save board. Please try again.');
        }
      }
    },
    [code, prevLists, prevCards, dragHappened, setToast]
  );

  const onScrap = useCallback(
    async (body: any) => {
      if (code) {
        try {
          const res = await scrapUrl(code, body);
          return res;
        } catch (err) {
          setToast('Failed to scrap url. Please try again.');
          throw new Error('Internal Server Error');
        }
      }
    },
    [code, setToast]
  );

  return (
    <BoardAPI>
      <BoardTemplate
        title={title}
        lists={prevLists}
        groupedCardsMap={groupedCardsMap}
        onAddElement={onAddElement}
        onEditTitle={onEditTitle}
        onInputBlurred={onInputBlurred}
        onDragHappened={onDragHappened}
        onDeleteElement={onDeleteElement}
        onScrap={onScrap}
      />
    </BoardAPI>
  );
};
