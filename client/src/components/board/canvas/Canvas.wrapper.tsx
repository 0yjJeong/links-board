import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { CanvasInner, CanvasOuter, Stack, ButtonStretch } from '../..';
import { Dragged, Element } from '../../../types';

interface CanvasWrapperProps {
  ComponentOuter?: React.FunctionComponent;
  ComponentInner?: React.FunctionComponent;
  dragHappened: (payload: Dragged) => void;
  addElement: (element: Element) => void;
  children: React.ReactElement;
}

const CanvasWrapper = ({
  ComponentOuter = CanvasOuter,
  ComponentInner = CanvasInner,
  dragHappened,
  addElement,
  children,
}: CanvasWrapperProps) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    dragHappened({
      elementId: result.draggableId,
      startId: result.source.droppableId,
      startIndex: result.source.index,
      endId: result.destination?.droppableId,
      endIndex: result.destination?.index,
      type: result.type,
    });
  };

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
            <ButtonStretch
              onClick={() => {
                addElement({ id: 'list-4', title: '' });
              }}
            >
              <IoMdAdd />
              ADD LIST
            </ButtonStretch>
          </Stack>
        </ComponentInner>
      </ComponentOuter>
    </DragDropContext>
  );
};

export default CanvasWrapper;
