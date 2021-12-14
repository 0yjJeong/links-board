import React from 'react';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { CanvasInner, CanvasInnerProps, CanvasOuter } from '.';

interface CanvasWrapperProps {
  ComponentOuter?: React.FunctionComponent;
  ComponentInner?: React.FunctionComponent<CanvasInnerProps>;
  onDragEnd: OnDragEndResponder;
}

export const CanvasWrapper = ({
  ComponentOuter = CanvasOuter,
  ComponentInner = CanvasInner,
  onDragEnd,
}: CanvasWrapperProps) => {
  return (
    <ComponentOuter>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable-all' direction='horizontal'>
          {(provided) => (
            <ComponentInner
              ref={provided.innerRef}
              {...provided.droppableProps}
            />
          )}
        </Droppable>
      </DragDropContext>
    </ComponentOuter>
  );
};
