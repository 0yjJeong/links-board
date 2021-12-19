import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { HiMinus } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import { CardWrapperProps, IUI } from '..';

export interface ListInnerDefaultProps {
  id: string;
  UI: IUI;
  Card: React.FunctionComponent<CardWrapperProps>;
}

const Body = styled.div`
  overflow-y: auto;
  padding-left: ${(p) => p.theme.spacing['normal']}px;
  padding-right: ${(p) => p.theme.spacing['normal']}px;
`;

export const ListInnerDefault = ({ id, Card, UI }: ListInnerDefaultProps) => {
  return (
    <>
      <UI.Stack spacing='normal'>
        <UI.Input theme='subTitle' placeholder='List title' />
        <UI.Buttons.Fill>
          <HiMinus />
        </UI.Buttons.Fill>
      </UI.Stack>
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
      <UI.Stack spacing='normal'>
        <UI.Buttons.Stretch>
          <IoMdAdd />
          <span> Add a link</span>
        </UI.Buttons.Stretch>
      </UI.Stack>
    </>
  );
};
