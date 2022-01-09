import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { Canvas, Column, Stack, Input, Button } from '..';
import { Card, Dragged, Element, List, TitleProps } from '../../types';
import { safe } from '../../utils';
import { deleteBoard } from '../../lib/api';

const Header = styled(Stack)`
  height: 3.4rem;
`;

export interface BoardTemplateProps {
  title: string;
  lists: List[];
  groupedCardsMap: { [key: string]: Card[] };
  onAddElement: (payload: Element) => Promise<void>;
  onInputBlurred: (
    payload: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  onEditTitle?: (payload: TitleProps) => void;
  onDragHappened?: (payload: Dragged) => Promise<void>;
  onDeleteElement?: (payload: Element) => Promise<void>;
  onScrap?: (payload: Omit<Card, 'data'>) => Promise<void>;
}

export const BoardTemplate = ({
  title,
  lists,
  groupedCardsMap,
  onAddElement,
  onInputBlurred,
  onDragHappened = async () => {},
  onEditTitle = () => {},
  onDeleteElement = async () => {},
  onScrap = async () => {},
}: BoardTemplateProps) => {
  const navigate = useNavigate();
  const { code } = useParams();

  const handleCreateBoard = React.useCallback(
    () => navigate('/board', { replace: true }),
    [navigate]
  );

  const handleDeleteBoard = React.useCallback(async () => {
    try {
      if (code) {
        await deleteBoard(code);
      }
    } catch (err) {
      console.log(err);
    }
    navigate('/');
  }, [code, navigate]);

  return (
    <>
      <Header axis='column' spacing='medium' gap='normal'>
        <Stack justify='space-between'>
          <Stack>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Button series='tertiary'>
                <IoIosArrowBack />
              </Button>
            </Link>
          </Stack>
          <Stack gap='small'>
            <Button onClick={handleCreateBoard}>
              <HiOutlineDocumentAdd />
              New
            </Button>
            <Button onClick={handleDeleteBoard}>
              <MdDelete />
              Delete
            </Button>
          </Stack>
        </Stack>
        <Stack>
          <Input
            name='title'
            color='grey5'
            placeholderColor='grey3'
            font='title1'
            placeholder='Board title'
            value={title}
            onChange={(e) =>
              onEditTitle({
                title: e.target.value,
              })
            }
            onBlur={onInputBlurred}
          />
        </Stack>
      </Header>
      <Canvas onDragHappened={onDragHappened} onAddElement={onAddElement}>
        <>
          {lists.map((list, index) => (
            <Column
              key={list.id}
              index={index}
              list={list}
              cards={safe(() => groupedCardsMap[list.id], [])}
              onEditTitle={onEditTitle}
              onDeleteElement={onDeleteElement}
              onAddElement={onAddElement}
              onInputBlurred={onInputBlurred}
              onScrap={onScrap}
            />
          ))}
        </>
      </Canvas>
    </>
  );
};
