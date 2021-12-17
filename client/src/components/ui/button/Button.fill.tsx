import { ButtonDefault, ButtonDefaultProps } from '.';

export const ButtonFillWrapper = ({
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
