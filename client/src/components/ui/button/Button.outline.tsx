import { ButtonDefault, ButtonDefaultProps } from '.';

export const ButtonOutlineWrapper = ({
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
