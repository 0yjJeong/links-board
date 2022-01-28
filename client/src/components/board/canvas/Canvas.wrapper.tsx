import React from 'react';
import short from 'short-uuid';
import { IoMdAdd } from 'react-icons/io';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { CanvasInner, CanvasOuter, Stack, ButtonStretch } from '../..';
import { Dragged, Element } from '../../../types';

interface CanvasWrapperProps {
  ComponentOuter?: React.FunctionComponent;
  ComponentInner?: React.FunctionComponent;
  onAddElement: (element: Element) => void;
  onDragHappened?: (dragged: Dragged) => void;
  children: React.ReactElement;
}

const CanvasWrapper = ({
  ComponentOuter = CanvasOuter,
  ComponentInner = CanvasInner,
  onDragHappened,
  onAddElement,
  children,
}: CanvasWrapperProps) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (onDragHappened) {
      onDragHappened({
        elementId: result.draggableId,
        startId: result.source.droppableId,
        startIndex: result.source.index,
        endId: result.destination?.droppableId,
        endIndex: result.destination?.index,
        type: result.type,
      });
    }
  };

  const handleAddList = () => {
    onAddElement({ id: short().new(), title: '' });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
            <ButtonStretch onClick={handleAddList}>
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
