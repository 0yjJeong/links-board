import React from 'react';
import { ListDefaultProps, CardWrapperProps } from '../';

interface ListsWrapperProps {
  List: React.FunctionComponent<ListDefaultProps>;
  Card: React.FunctionComponent<CardWrapperProps>;
}

export const ListsWrapper = ({ List, Card }: ListsWrapperProps) => {
  return (
    <>
      {[{ id: '1' }, { id: '2' }, { id: '3' }].map((list, index) => (
        <List key={list.id} id={list.id} index={index} />
      ))}
    </>
  );
};
