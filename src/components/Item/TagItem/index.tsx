import React, { HtmlHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { MAIN_COLOR, SECONDARY_COLOR_GRAY_1 } from 'libs/constant';
import { PropsTagItem } from 'models';

interface PropsTagItemExtends extends HtmlHTMLAttributes<HTMLDivElement> {
  id: string;
  status: boolean;
  isEdit?: boolean;
  tag: PropsTagItem;
  handleRemoveTag?: (tag: PropsTagItem) => void;
}

const StyledTagItem = styled.div<{
  tagIcoColor: string;
  status: boolean;
  isEdit: boolean;
}>`
  position: relative;
  border: 1px solid
    ${props => (props.status ? props.tagIcoColor : SECONDARY_COLOR_GRAY_1)};
  cursor: pointer;
  &:hover {
    border: 1px solid ${props => props.tagIcoColor ?? MAIN_COLOR};
  }
  ${props =>
    props.isEdit &&
    css`
      display: flex;
      align-items: center;
      .remove-tag {
        width: 30px;
        height: 20px;
        background: url('https://img.icons8.com/pastel-glyph/2x/cancel.png')
          center center no-repeat;
        background-size: 50%;
        border: none;
        outline: none;
        cursor: pointer;
        transform: translateX(15px);
        z-index: 1;
      }
    `}
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
  const {
    tag,
    status,
    isEdit = false,
    handleRemoveTag,

    ...rest
  } = props;

  return (
    <StyledTagItem
      className="tag-item"
      tagIcoColor={tag.tagIcoColor}
      status={status}
      isEdit={isEdit}
      {...rest}
    >
      {tag.text}

      {isEdit && handleRemoveTag && (
        <button
          className="remove-tag"
          onClick={() => handleRemoveTag(tag)}
        ></button>
      )}
    </StyledTagItem>
  );
};

export default React.memo(TagItem);
