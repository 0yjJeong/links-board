import styled from 'styled-components';
import { ButtonDefault, ButtonDefaultProps } from '.';

const ButtonStretchDefault = styled(ButtonDefault)`
  width: 100%;
`;

export const ButtonStretchWrapper = ({
  buttonStyle = {
    color: 'grey4',
    size: 'title1',
    border: null,
    background: null,
    hoverd: 'grey2',
  },
  ...rest
}: ButtonDefaultProps) => {
  return <ButtonStretchDefault {...rest} buttonStyle={buttonStyle} />;
};
