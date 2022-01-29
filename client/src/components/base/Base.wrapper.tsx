import { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Stack, ToastDefault } from '..';
import { RootState } from '../../store';

const BaseDefault = styled(Stack)`
  background: ${(p) => p.theme.palette['grey0']};
`;

const BaseWrapper: FC = ({ children }) => {
  const message = useSelector((state: RootState) => state.board.message);

  return (
    <BaseDefault axis='column' gap='medium'>
      {message && <ToastDefault>{message}</ToastDefault>}
      {children}
    </BaseDefault>
  );
};

export default BaseWrapper;
