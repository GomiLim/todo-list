import React, { HtmlHTMLAttributes } from 'react';
import styled from 'styled-components';

import { MAIN_COLOR, SECONDARY_COLOR_GRAY_1 } from 'libs/constant';

interface PropsTagItemExtends extends HtmlHTMLAttributes<HTMLDivElement> {
  id: string;
  tagIcoColor: string;
  text: string;
  status: boolean;
}

const StyledTagItem = styled.div<{ tagIcoColor: string; status: boolean }>`
  position: relative;
  border: 1px solid
    ${props => (props.status ? props.tagIcoColor : SECONDARY_COLOR_GRAY_1)};

  &:hover {
    border: 1px solid ${props => props.tagIcoColor ?? MAIN_COLOR};
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background: ${props => props.tagIcoColor ?? MAIN_COLOR};
  }
`;

const TagItem = (props: PropsTagItemExtends) => {
  const { tagIcoColor, text, status, ...rest } = props;

  return (
    <StyledTagItem
      className="tag-item"
      tagIcoColor={tagIcoColor}
      status={status}
      {...rest}
    >
      {text}
    </StyledTagItem>
  );
};

export default React.memo(TagItem);
