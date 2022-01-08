import styled from 'styled-components';
import ButtonDefault, { ButtonDefaultProps } from './Button.default';

const ButtonStretchDefault = styled(ButtonDefault)`
  width: 100%;
`;

const ButtonStretch = (props: ButtonDefaultProps) => {
  return <ButtonStretchDefault series='tertiary' {...props} />;
};

export default ButtonStretch;
