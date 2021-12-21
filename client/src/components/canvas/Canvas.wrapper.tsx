import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { CanvasInner, CanvasOuter, Stack, ButtonStretch } from '..';

interface CanvasWrapperProps {
  ComponentOuter?: React.FunctionComponent;
  ComponentInner?: React.FunctionComponent;
  onDragEnd: OnDragEndResponder;
  children: React.ReactElement;
}

const CanvasWrapper = ({
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
              <Stack
                gap='normal'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {children}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
          <Stack align='start'>
            <ButtonStretch>
              <IoMdAdd />
              Add list
            </ButtonStretch>
          </Stack>
        </ComponentInner>
      </ComponentOuter>
    </DragDropContext>
  );
};

export default CanvasWrapper;
