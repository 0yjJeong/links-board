import { InputDefault, InputCSS, InputProps } from './Input.default';

type InputThemeMap = {
  [key in 'title1' | 'subTitle']: InputCSS;
};

const inputThemeMap: InputThemeMap = {
  title1: {
    _color: 'grey5',
    _placeholder: 'grey3',
    _weight: '500',
    _size: 'title1',
  },
  subTitle: {
    _color: 'grey5',
    _placeholder: 'grey3',
    _size: 'subtitle',
  },
};

interface InputWrapperProps extends InputProps {
  theme: keyof InputThemeMap;
}

const InputWrapper = ({ theme, ...rest }: InputWrapperProps) => {
  return <InputDefault {...rest} css={inputThemeMap[theme]} />;
};

export default InputWrapper;
