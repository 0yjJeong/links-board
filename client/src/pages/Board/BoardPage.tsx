import { useCallback, ChangeEvent } from 'react';
import { BoardTemplate } from '..';

export const BoardPage = () => {
  const onAddElement = useCallback(async () => {}, []);

  const onEditTitle = useCallback(() => {}, []);

  const onInputBlurred = useCallback(
    async (payload: ChangeEvent<HTMLInputElement>) => {
      console.log('blurred');
    },
    []
  );

  return (
    <BoardTemplate
      title=''
      lists={[]}
      groupedCardsMap={{}}
      onAddElement={onAddElement}
      onInputBlurred={onInputBlurred}
      onEditTitle={onEditTitle}
    />
  );
};
