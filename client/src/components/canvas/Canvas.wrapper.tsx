import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import {
  CanvasInner,
  CanvasOuter,
  StackDefault,
  ButtonStretchWrapper,
} from '..';

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
        <ComponentInner>
          <Droppable
            droppableId='droppable-all'
            direction='horizontal'
            type='list'
          >
            {(provided) => (
              <StackDefault
                gap='normal'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {children}
                {provided.placeholder}
              </StackDefault>
            )}
          </Droppable>
          <StackDefault align='start'>
            <ButtonStretchWrapper>
              <IoMdAdd />
              Add list
            </ButtonStretchWrapper>
          </StackDefault>
        </ComponentInner>
      </ComponentOuter>
    </DragDropContext>
  );
};
