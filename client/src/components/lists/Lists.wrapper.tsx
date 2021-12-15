import React from 'react';
import { ListDefaultProps, ListInnerDefaultProps, CardWrapperProps } from '../';

interface ListsWrapperProps {
  List: React.FunctionComponent<ListDefaultProps>;
  ListInner: React.FunctionComponent<ListInnerDefaultProps>;
  Card: React.FunctionComponent<CardWrapperProps>;
}

export const ListsWrapper = ({ List, ListInner, Card }: ListsWrapperProps) => {
  return (
    <>
      {[{ id: '1' }, { id: '2' }, { id: '3' }].map((list, index) => (
        <List
          key={list.id}
          id={list.id}
          index={index}
          ListInner={ListInner}
          Card={Card}
        />
      ))}
    </>
  );
};
