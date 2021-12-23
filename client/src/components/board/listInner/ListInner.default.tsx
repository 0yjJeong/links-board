import { useEffect, useRef, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { HiMinus } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import short from 'short-uuid';
import { Card, Stack, Input, Button, ButtonStretch } from '../../';
import { ListDefaultProps } from '../list/List.default';
import { scrapUrl } from '../../../lib/api';
import { useParams } from 'react-router';

export interface ListInnerDefaultProps extends ListDefaultProps {}

const Body = styled.div`
  overflow-y: auto;
  padding-left: ${(p) => p.theme.spacing['normal']}px;
  padding-right: ${(p) => p.theme.spacing['normal']}px;
`;

const ListInnerDefault = ({
  list,
  cards = [],
  editTitle,
  deleteElement,
  addElement,
}: ListInnerDefaultProps) => {
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

  const onScrap = async () => {
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
        addElement(payload);

        setAdding(false);
      }
    }
  };

  return (
    <>
      <Stack spacing='normal' align='center'>
        <Input
          theme='subTitle'
          placeholder='List title'
          value={list.title}
          onChange={(e) =>
            editTitle({
              id: list.id,
              title: e.target.value,
            })
          }
        />
        <Button style={{ height: '21.33px' }}>
          <HiMinus onClick={() => deleteElement(list)} />
        </Button>
      </Stack>
      <Droppable droppableId={list.id} type='card'>
        {(provided) => (
          <Body ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Card key={card.id} id={card.id} index={index} />
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
              <Input theme='subTitle' placeholder='http://' ref={inputRef} />
              <Button themeName='transperent' onClick={onScrap}>
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

export default ListInnerDefault;
