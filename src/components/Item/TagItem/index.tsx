import React, { HtmlHTMLAttributes } from 'react';
import styled from 'styled-components';

import { PropsTagItem } from 'models';
import { MAIN_COLOR } from 'libs/constant';
import { SECONDARY_COLOR_GRAY_1 } from 'libs/constant';

interface ExtendsTagItem
  extends Omit<PropsTagItem, 'id'>,
    HtmlHTMLAttributes<HTMLDivElement> {}

const StyledTagItem = styled.div<{ tagIcoColor: string; status: string }>`
  position: relative;
  border: 1px solid
    ${props =>
      props.status === 'active' ? props.tagIcoColor : SECONDARY_COLOR_GRAY_1};

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

const TagItem = (props: ExtendsTagItem) => {
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
