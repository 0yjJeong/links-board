import ButtonDefault, { ButtonDefaultProps } from './Button.default';

const ButtonFill = ({
  buttonStyle = {
    color: 'grey4',
    size: 'subtitle',
    hoverd: 'grey3',
    border: null,
    background: 'grey2',
  },
  ...rest
}: ButtonDefaultProps) => {
  return <ButtonDefault {...rest} buttonStyle={buttonStyle} />;
};

export default ButtonFill;
