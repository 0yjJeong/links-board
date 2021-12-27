import { useMemo } from 'react';
import { ImageDefault, ImageDefaultProps } from '..';

const ImageWrapper = (props: ImageDefaultProps) => {
  const validation = useMemo(() => {
    if (!props.imageURL) return false;
    const regex = new RegExp(/.*\.(gif|jpe?g|bmp|png)$/gim);
    return regex.test(props.imageURL);
  }, [props.imageURL]);

  if (!validation) return null;

  return <ImageDefault {...props} />;
};

export default ImageWrapper;
