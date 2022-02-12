import { useEffect, useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { HiMinus } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import { DotLoader } from 'react-spinners';
import { Card, Stack, Input, Button, ButtonStretch } from '../..';
import { ColumnDefaultProps } from '../column/Column.default';
import theme from '../../../constants/theme';
import useScrap from '../../../hooks/useScrap';

export interface ColumnInnerDefaultProps extends ColumnDefaultProps {}

const Body = styled.div`
  overflow-y: auto;
  padding-left: ${(p) => p.theme.spacing['normal']}px;
  padding-right: ${(p) => p.theme.spacing['normal']}px;
  min-height: 20px;
`;

const ColumnInnerDefault = ({
  code,
  list,
  cards = [],
  onEditTitle,
  onDeleteElement,
  onInputBlurred,
}: ColumnInnerDefaultProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { typing, scraping, onBlur, onScrap, onReset } = useScrap();

  useEffect(() => {
    if (typing) {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.addEventListener('blur', onBlur);
      }
    }
  }, [typing, onBlur]);

  return (
    <>
      <Stack spacing='normal' align='center'>
        <Input
          color='grey5'
          placeholderColor='grey3'
          font='title2'
          placeholder='List title'
          value={list.title}
          onChange={(e) => onEditTitle(e.target.value, list.id)}
          onBlur={onInputBlurred}
        />
        <Button>
          <HiMinus onClick={() => onDeleteElement(list)} />
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
        {scraping ? (
          <DotLoader color={theme.palette.grey3} size={18} />
        ) : typing ? (
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
                onClick={() => onScrap(code, list.id, inputRef.current?.value)}
              >
                ADD
              </Button>
            </Stack>
          </div>
        ) : (
          <ButtonStretch onClick={onReset}>
            <IoMdAdd />
            <span>ADD LINK</span>
          </ButtonStretch>
        )}
      </Stack>
    </>
  );
};

export default ColumnInnerDefault;
