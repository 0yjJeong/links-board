import styled from 'styled-components';

interface ImageDefaultProps {
  imageURL: string;
}

export const ImageDefault = styled.div<ImageDefaultProps>`
  background-image: url(${(p) => p.imageURL});
  background-position: center;
  background-size: cover;
  min-height: 140px;
  width: 100%;
`;
