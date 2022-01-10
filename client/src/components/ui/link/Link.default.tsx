import React from 'react';
import styled from 'styled-components';

interface LinkDefaultProps extends React.HtmlHTMLAttributes<HTMLLinkElement> {}

const LinkDefault = styled.a<LinkDefaultProps>`
  word-wrap: break-word;
  text-decoration: none;
  color: inherit;
  font-size: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: absolute;
  width: inherit;
  line-height: initial;
`;

export default LinkDefault;
