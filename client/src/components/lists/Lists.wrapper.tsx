import React from 'react';
import { ListWrapper, ListWrapperProps } from '../';

interface ListsWrapperProps {
  ComponentList?: React.FunctionComponent<ListWrapperProps>;
}

export const ListsWrapper = ({
  ComponentList = ListWrapper,
}: ListsWrapperProps) => {
  return (
    <>
      {['', '', ''].map((_, listIndex) => (
        <ComponentList key={listIndex} />
      ))}
    </>
  );
};
