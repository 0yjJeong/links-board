import React, { useEffect, useRef, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { HiMinus } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import { DotLoader } from 'react-spinners';
import { useParams } from 'react-router';
import { Card, Stack, Input, Button, ButtonStretch } from '../..';
import { ColumnDefaultProps } from '../column/Column.default';
import theme from '../../../constants/theme';
import { useDispatch } from 'react-redux';
import { scrapThunk } from '../../../store/board/thunks';

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
  onInputBlurred,
}: ColumnInnerDefaultProps) => {
  const { code } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
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
        const url = inputRef.current.value;

        dispatch(scrapThunk(code, list.id, url, setLoading));
      }
    }
  };

  const handleDeleteColumn = () => {
    onDeleteElement(list);
  };

  const handleEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEditTitle(e.target.value, list.id);
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
          <DotLoader color={theme.palette.grey3} size={18} />
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
