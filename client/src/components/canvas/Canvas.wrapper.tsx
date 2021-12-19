import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { CanvasInner, CanvasOuter, IUI } from '..';

interface CanvasWrapperProps {
  UI: IUI;
  ComponentOuter?: React.FunctionComponent;
  ComponentInner?: React.FunctionComponent;
  onDragEnd: OnDragEndResponder;
  children: React.ReactElement;
}

export const CanvasWrapper = ({
  UI,
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
              <UI.Stack
                gap='normal'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {children}
                {provided.placeholder}
              </UI.Stack>
            )}
          </Droppable>
          <UI.Stack align='start'>
            <UI.Buttons.Stretch>
              <IoMdAdd />
              Add list
            </UI.Buttons.Stretch>
          </UI.Stack>
        </ComponentInner>
      </ComponentOuter>
    </DragDropContext>
  );
};
