import styled from 'styled-components';
import { Radii } from '../../../constants/theme';

export interface ImageDefaultProps {
  imageURL: string;
  radii: keyof Radii;
}

const ImageDefault = styled.div<ImageDefaultProps>`
  background-image: url(${(p) => p.imageURL});
  background-position: center;
  background-size: cover;
  min-height: 140px;
  width: 100%;
  border-radius: ${(p) => p.theme.radii[p.radii]}px;
`;

export default ImageDefault;
