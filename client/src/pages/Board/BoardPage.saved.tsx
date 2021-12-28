import { useCallback, useMemo, ChangeEvent } from 'react';
import { useParams } from 'react-router';
import { BoardAPI, BoardProps, BoardTemplate } from '..';
import { Card, Dragged, Element, TitleProps } from '../../types';
import { updateBoard } from '../../lib/api';
import { getElementKey, updateCards, updateLists } from '../../utils/board';

export const BoardPageSaved = ({
  title,
  lists: prevLists,
  cards: prevCards,
  updateElements,
  editTitle,
  dragHappened,
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
        const key = getElementKey(payload);

        let arr =
          key === 'lists' ? [prevLists, prevCards] : [prevCards, prevLists];

        let nextElements = [...arr[0], payload];

        updateElements(nextElements);

        await updateBoard(code, {
          elements: [...arr[1], ...nextElements],
        });
      }
    },
    [code, prevLists, prevCards, updateElements]
  );

  const onDeleteElement = useCallback(
    async (payload: Element) => {
      if (code) {
        const key = getElementKey(payload);

        let arr =
          key === 'lists' ? [prevLists, prevCards] : [prevCards, prevLists];

        const index = arr[0].findIndex((element) => element.id === payload.id);

        const nextElements = [
          ...arr[0].slice(0, index),
          ...arr[0].slice(index + 1),
        ];

        updateElements(nextElements);

        await updateBoard(code, {
          elements: [...arr[1], ...nextElements],
        });
      }
    },
    [code, prevLists, prevCards, updateElements]
  );

  const onEditTitle = useCallback(
    (payload: TitleProps) => editTitle(payload),
    [editTitle]
  );

  const onInputBlurred = useCallback(
    async (payload: ChangeEvent<HTMLInputElement>) => {
      if (code) {
        let body = {};

        payload.target.name === 'title'
          ? (body = {
              title: payload.target.value,
            })
          : (body = {
              elements: [...prevCards, ...prevLists],
            });

        await updateBoard(code, body);
      }
    },
    [code, prevCards, prevLists]
  );

  const onDragHappened = useCallback(
    async (payload: Dragged) => {
      if (code) {
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
      }
    },
    [code, prevLists, prevCards, dragHappened]
  );

  const onTextToClipboard = useCallback(() => {
    if (code) {
      navigator.clipboard.writeText(code);
    }
  }, [code]);

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
        onTextToClipboard={onTextToClipboard}
      />
    </BoardAPI>
  );
};
