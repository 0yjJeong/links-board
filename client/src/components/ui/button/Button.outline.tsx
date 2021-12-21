import ButtonDefault, { ButtonDefaultProps } from './Button.default';

const ButtonOutline = ({
  buttonStyle = {
    color: 'grey5',
    size: 'title1',
    border: 'grey3',
    background: null,
    hoverd: 'grey1',
  },
  ...rest
}: ButtonDefaultProps) => {
  return <ButtonDefault {...rest} buttonStyle={buttonStyle} />;
};

export default ButtonOutline;
