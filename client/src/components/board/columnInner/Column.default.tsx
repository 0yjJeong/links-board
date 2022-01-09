import React, { useEffect, useRef, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { HiMinus } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import short from 'short-uuid';
import { DotLoader } from 'react-spinners';
import { useParams } from 'react-router';
import { Card, Stack, Input, Button, ButtonStretch } from '../..';
import { ColumnDefaultProps } from '../column/Column.default';
import { isCard } from '../../../utils/board';
import theme from '../../../constants/theme';

export interface ColumnInnerDefaultProps extends ColumnDefaultProps {}

const Body = styled.div`
  overflow-y: auto;
  padding-left: ${(p) => p.theme.spacing['normal']}px;
  padding-right: ${(p) => p.theme.spacing['normal']}px;
  min-height: 20px;
`;

const ColumnInnerDefault = ({
  list,
  cards = [],
  onEditTitle,
  onDeleteElement,
  onAddElement,
  onInputBlurred,
  onScrap,
}: ColumnInnerDefaultProps) => {
  const { code } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

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
        try {
          const url = inputRef.current.value;

          const body = {
            id: short().new(),
            attachedTo: list.id,
            url,
          };

          setLoading(true);

          const res = await onScrap(body);

          const payload = {
            ...body,
            data: res as any,
          };

          if (payload && isCard(payload)) {
            onAddElement(payload);
          }

          setAdding(false);
          setLoading(false);
        } catch (err) {
          console.error(err);
        }
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
          onBlur={onInputBlurred}
        />
        <Button>
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
      <Stack spacing='normal' justify='center'>
        {loading ? (
          <Stack spacing='small'>
            <DotLoader
              color={theme.palette.grey3}
              loading={loading}
              size={18}
            />
          </Stack>
        ) : adding ? (
          <div style={{ background: '#fff', width: '100%' }}>
            <Stack align='center'>
              <Input
                color='grey5'
                placeholderColor='grey3'
                font='subtitle'
                placeholder='http://'
                ref={inputRef}
              />
              <Button
                series='tertiary'
                style={{ fontSize: '0.4rem', marginRight: '4px' }}
                onClick={handleScrap}
              >
                ADD
              </Button>
            </Stack>
          </div>
        ) : (
          <ButtonStretch onClick={() => setAdding(true)}>
            <IoMdAdd />
            <span>ADD LINK</span>
          </ButtonStretch>
        )}
      </Stack>
    </>
  );
};

export default ColumnInnerDefault;
