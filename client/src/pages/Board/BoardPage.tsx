import { useCallback } from 'react';
import { BoardTemplate } from '.';

export const BoardPage = () => {
  const onAddElement = useCallback(() => {}, []);

  const onEditTitle = useCallback(() => {}, []);

  return (
    <BoardTemplate
      title=''
      lists={[]}
      groupedCardsMap={{}}
      onAddElement={onAddElement}
      onEditTitle={onEditTitle}
    />
  );
};
