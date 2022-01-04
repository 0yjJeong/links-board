import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Stack, Toast } from '..';
import { RootState } from '../../store';
import { setToast } from '../../store/base';

const BaseDefault = styled(Stack)`
  background: ${(p) => p.theme.palette['grey0']};
`;

const BaseWrapper: FC = ({ children }) => {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.base.toast);

  return (
    <BaseDefault axis='column' gap='medium'>
      <Toast
        text={toast}
        millisecond={1500}
        onTimeout={() => dispatch(setToast(''))}
      />
      {children}
    </BaseDefault>
  );
};

export default BaseWrapper;
