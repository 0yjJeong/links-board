import styled from 'styled-components';
import ButtonDefault, { ButtonDefaultProps } from './Button.default';

const ButtonStretchDefault = styled(ButtonDefault)`
  width: 100%;
`;

const ButtonStretch = ({
  themeName = 'transperent1',
  ...rest
}: ButtonDefaultProps) => {
  return <ButtonStretchDefault {...rest} themeName={themeName} />;
};

export default ButtonStretch;
