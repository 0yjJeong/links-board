import { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Stack, Toast } from '..';
import { RootState } from '../../store';

const BaseDefault = styled(Stack)`
  background: ${(p) => p.theme.palette['grey0']};
`;

const BaseWrapper: FC = ({ children }) => {
  const message = useSelector((state: RootState) => state.base.message);
  const error = useSelector((state: RootState) => state.base.error);

  return (
    <BaseDefault axis='column' gap='medium'>
      <Toast message={message} error={error} />
      {children}
    </BaseDefault>
  );
};

export default BaseWrapper;
