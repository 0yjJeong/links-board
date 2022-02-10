import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { AiFillHome } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { Stack, Input, Button } from '../../';
import React from 'react';

const Header = styled(Stack)`
  height: 3.4rem;
`;

interface HeaderDefaultProps {
  code: string | undefined;
  title: string | null;
  onInputBlurred: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteBoard?: () => void;
  onEditTitle?: (title: string, id?: string) => void;
}

export const BoardHeaderDefault = ({
  code,
  title,
  onDeleteBoard,
  onInputBlurred,
  onEditTitle,
}: HeaderDefaultProps) => {
  const navigate = useNavigate();
  const titleProps: React.InputHTMLAttributes<HTMLInputElement> = React.useMemo(
    () =>
      title !== null && onEditTitle
        ? {
            value: title,
            onChange: (e) => onEditTitle(e.target.value),
          }
        : {},
    [title, onEditTitle]
  );

  return (
    <Header axis='column' spacing='medium' gap='normal'>
      <Stack justify='space-between'>
        <Stack>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Button series='tertiary'>
              <AiFillHome />
            </Button>
          </Link>
        </Stack>
        <Stack gap='small'>
          <Button onClick={() => navigate('/board', { replace: true })}>
            <HiOutlineDocumentAdd />
            New
          </Button>
          {code && (
            <Button onClick={onDeleteBoard}>
              <MdDelete />
              Delete
            </Button>
          )}
        </Stack>
      </Stack>
      <Stack>
        <Input
          {...titleProps}
          name='title'
          color='grey5'
          placeholderColor='grey3'
          font='title1'
          placeholder='Board title'
          onBlur={onInputBlurred}
        />
      </Stack>
    </Header>
  );
};
