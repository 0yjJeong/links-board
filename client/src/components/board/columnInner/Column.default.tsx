import React, { useEffect, useRef, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { HiMinus } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import short from 'short-uuid';
import { Card, Stack, Input, Button, ButtonStretch } from '../..';
import { ColumnDefaultProps } from '../column/Column.default';
import { scrapUrl } from '../../../lib/api';
import { useParams } from 'react-router';

export interface ColumnInnerDefaultProps extends ColumnDefaultProps {}

const Body = styled.div`
  overflow-y: auto;
  padding-left: ${(p) => p.theme.spacing['normal']}px;
  padding-right: ${(p) => p.theme.spacing['normal']}px;
`;

const ColumnInnerDefault = ({
  list,
  cards = [],
  onEditTitle,
  onDeleteElement,
  onAddElement,
}: ColumnInnerDefaultProps) => {
  const { code } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (adding) {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.addEventListener('blur', (e) => {
          let element;
          if (e.relatedTarget) {
            (e.relatedTarget as HTMLElement).childNodes.forEach((child) => {
              if (child.textContent === 'ADD') {
                element = child;
              }
            });
          }

          if (!element) {
            setAdding(false);
          }
        });
      }
    }
  }, [adding]);

  const handleScrap = async () => {
    if (code) {
      if (inputRef.current) {
        const url = inputRef.current.value;

        const body = {
          id: short().new(),
          attachedTo: list.id,
          url,
        };
        const res = await scrapUrl(code, body);

        const payload = {
          ...body,
          data: res,
        };
        onAddElement(payload);

        setAdding(false);
      }
    }
  };

  const handleDeleteColumn = () => {
    onDeleteElement(list);
  };

  const handleEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEditTitle({
      id: list.id,
      title: e.target.value,
    });
  };

  return (
    <>
      <Stack spacing='normal' align='center'>
        <Input
          color='grey5'
          placeholderColor='grey3'
          font='title2'
          placeholder='List title'
          value={list.title}
          onChange={handleEditTitle}
        />
        <Button style={{ height: '21.33px' }}>
          <HiMinus onClick={handleDeleteColumn} />
        </Button>
      </Stack>
      <Droppable droppableId={list.id} type='card'>
        {(provided) => (
          <Body ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onDeleteElement={onDeleteElement}
              />
            ))}
            {provided.placeholder}
          </Body>
        )}
      </Droppable>
      <Stack spacing='normal'>
        {adding ? (
          <div
            style={{
              width: '100%',
              background: '#fff',
              borderRadius: '4px',
              margin: 'auto',
            }}
          >
            <Stack spacing='small'>
              <Input
                color='grey5'
                placeholderColor='grey3'
                font='title2'
                placeholder='http://'
                ref={inputRef}
              />
              <Button themeName='transperent' onClick={handleScrap}>
                ADD
              </Button>
            </Stack>
          </div>
        ) : (
          <ButtonStretch onClick={() => setAdding(true)}>
            <IoMdAdd />
            <span>ADD CARD</span>
          </ButtonStretch>
        )}
      </Stack>
    </>
  );
};

export default ColumnInnerDefault;
