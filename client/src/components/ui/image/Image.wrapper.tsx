import { ImageDefault } from '..';

interface ImageWrapperProps {
  imageURL: string;
}

const ImageWrapper = ({ imageURL }: ImageWrapperProps) => {
  return <ImageDefault imageURL={imageURL} />;
};

export default ImageWrapper;
