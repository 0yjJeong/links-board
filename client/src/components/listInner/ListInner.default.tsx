import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { HiMinus } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import {
  ButtonStretchWrapper as ButtonStretch,
  ButtonFillWrapper as ButtonFill,
  CardWrapperProps,
  InputWrapper as Input,
  StackDefault as Stack,
} from '..';

export interface ListInnerDefaultProps {
  id: string;
  Card: React.FunctionComponent<CardWrapperProps>;
}

const Body = styled.div`
  overflow-y: auto;
  padding-left: ${(p) => p.theme.spacing['normal']}px;
  padding-right: ${(p) => p.theme.spacing['normal']}px;
`;

export const ListInnerDefault = ({ id, Card }: ListInnerDefaultProps) => {
  return (
    <>
      <Stack spacing='normal'>
        <Input theme='subTitle' placeholder='List title' />
        <ButtonFill>
          <HiMinus />
        </ButtonFill>
      </Stack>
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
      <Stack spacing='normal'>
        <ButtonStretch>
          <IoMdAdd />
          <span> Add a link</span>
        </ButtonStretch>
      </Stack>
    </>
  );
};
