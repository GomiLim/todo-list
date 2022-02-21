import React, { HtmlHTMLAttributes, useState } from 'react';
import styled, { css } from 'styled-components';

import { MAIN_COLOR, SECONDARY_COLOR_GRAY_1 } from 'libs/constant';
import { TagItemInterface } from 'models';

interface TagItemInterfaceExtends extends HtmlHTMLAttributes<HTMLDivElement> {
  id: string;
  status: boolean;
  isEdit?: boolean;
  tag: TagItemInterface;
  handleRemoveTag?: (tag: TagItemInterface) => void;
  handleEditTag?: (tag: TagItemInterface) => void;
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
      padding: 5px 0px 5px 20px;
      .remove-tag {
        width: 30px;
        height: 20px;
        background: url('https://img.icons8.com/pastel-glyph/2x/cancel.png')
          center center no-repeat;
        background-size: 50%;
        border: none;
        outline: none;
        cursor: pointer;
        z-index: 1;
      }
      .edit-tag {
        width: 30px;
        height: 20px;
        border: none;
        outline: none;
        text-align: center;
        margin-left: 10px;
        img {
          width: 20px;
        }
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

const TagItem = (props: TagItemInterfaceExtends) => {
  const {
    tag,
    status,
    isEdit = false,
    handleRemoveTag,
    handleEditTag,
    ...rest
  } = props;
  const [editMode, setEditMode] = useState(false);
  const [tagTextValue, setTagTextValue] = useState(tag.text);

  const handleEditTagMode = () => {
    setEditMode(true);
  };

  const handleEditText = (updateText: string) => {
    setTagTextValue(updateText);
  };

  const handleSaveUpdateTag = (tag: TagItemInterface) => {
    handleEditTag && handleEditTag(tag);
    setEditMode(false);
  };
  return (
    <StyledTagItem
      className="tag-item"
      tagIcoColor={tag.tagIcoColor}
      status={status}
      isEdit={isEdit}
      {...rest}
    >
      {editMode ? (
        <input
          type="text"
          maxLength={20}
          id={`tagtxt-${tag.id}`}
          value={tagTextValue}
          disabled={!editMode}
          readOnly={!editMode}
          onChange={updateText =>
            handleEditText(updateText.currentTarget.value)
          }
        />
      ) : (
        <label htmlFor={`tagtxt-${tag.id}`}>{tagTextValue}</label>
      )}

      {isEdit && handleRemoveTag && handleEditTag && (
        <>
          <button
            className="edit-tag"
            onClick={() =>
              editMode
                ? handleSaveUpdateTag({ ...tag, text: tagTextValue })
                : handleEditTagMode()
            }
          >
            {editMode ? (
              <img src="https://img.icons8.com/material-outlined/24/000000/save.png" />
            ) : (
              <img src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png" />
            )}
          </button>
          <button
            className="remove-tag"
            onClick={() => handleRemoveTag(tag)}
          ></button>
        </>
      )}
    </StyledTagItem>
  );
};

export default React.memo(TagItem);
