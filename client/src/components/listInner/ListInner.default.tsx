import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { CardWrapperProps, StackDefault } from '..';

export interface ListInnerDefaultProps {
  id: string;
  Card: React.FunctionComponent<CardWrapperProps>;
}

const Body = styled.div`
  overflow-y: auto;
`;

export const ListInnerDefault = ({ id, Card }: ListInnerDefaultProps) => {
  return (
    <>
      <StackDefault spacing='normal'>{id}</StackDefault>
      <Droppable droppableId={id} type='card'>
        {(provided) => (
          <Body ref={provided.innerRef} {...provided.droppableProps}>
            {[{ id: '1' }, { id: '2' }, { id: '3' }].map((card, index) => (
              <Card key={card.id} id={`${id}${card.id}`} index={index} />
            ))}
            {provided.placeholder}
          </Body>
        )}
      </Droppable>
      <StackDefault spacing='normal'>Footer</StackDefault>
    </>
  );
};
