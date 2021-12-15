import React from 'react';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { CanvasInner, CanvasOuter } from '.';

interface CanvasWrapperProps {
  ComponentOuter?: React.FunctionComponent;
  ComponentInner?: React.FunctionComponent;
  onDragEnd: OnDragEndResponder;
  children: React.ReactElement;
}

export const CanvasWrapper = ({
  ComponentOuter = CanvasOuter,
  ComponentInner = CanvasInner,
  onDragEnd,
  children,
}: CanvasWrapperProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ComponentOuter>
        <Droppable
          droppableId='droppable-all'
          direction='horizontal'
          type='list'
        >
          {(provided) => (
            <CanvasInner ref={provided.innerRef} {...provided.droppableProps}>
              {children}
              {provided.placeholder}
            </CanvasInner>
          )}
        </Droppable>
      </ComponentOuter>
    </DragDropContext>
  );
};
