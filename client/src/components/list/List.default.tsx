import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { ListInnerDefaultProps, CardWrapperProps } from '../';

export const ListDefaultOuter = styled.div`
  width: 340px;
  flex: 0 0 auto;
`;

export const ListDefaultInner = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  background: ${(p) => p.theme.palette.grey[2]};
  border-radius: ${(p) => p.theme.radii['small']}px;
  padding-left: ${(p) => p.theme.spacing['normal']}px;
  padding-right: ${(p) => p.theme.spacing['normal']}px;
`;

export interface ListDefaultProps {
  id: string;
  index: number;
  ListInner: React.FunctionComponent<ListInnerDefaultProps>;
  Card: React.FunctionComponent<CardWrapperProps>;
}

export const ListDefault = ({
  id,
  index,
  ListInner,
  Card,
}: ListDefaultProps) => {
  const children = <ListInner id={id} Card={Card} />;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <ListDefaultOuter
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <ListDefaultInner>{children}</ListDefaultInner>
        </ListDefaultOuter>
      )}
    </Draggable>
  );
};
