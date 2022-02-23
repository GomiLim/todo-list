import React, { useRef, useState, useContext } from 'react';
import { Portal } from 'containers';
import { CreateTag } from 'components/Inputs';
import { CommonModal, TagItem } from 'components';

import { findSameItem } from 'libs/utill';
import { MAIN_COLOR } from 'libs/constant';
import { PortalContext } from 'context/PortalContext';
import { alertMessageInterface } from 'models';
import { useStore } from 'hooks';
import { useObserver } from 'mobx-react';
import { TagData } from 'stores/tag';

interface PropsTags {
  setSelectTag?: React.Dispatch<React.SetStateAction<TagData[]>>;
  selectTag?: TagData[];
  isEdit?: boolean;
}

const Tags = (props: PropsTags) => {
  const { filter, tag } = useStore();
  const { setSelectTag, selectTag, isEdit = false } = props;

  const [showCreateTagBtn, setShowCreateTagBtn] = useState(false);
  const [alertMessage, setAlertMessage] = useState<alertMessageInterface>({
    message: '',
    type: 'info',
    completeEvent: undefined,
    cancelEvent: undefined
  });

  const { isModalVisible, openModal } = useContext(PortalContext);

  const tagTextRef = useRef<HTMLInputElement>(null);
  const tagColorRef = useRef<HTMLInputElement>(null);

  const removeTag = (list: TagData[], item: TagData) => {
    return list.filter((prevItem: TagData) => prevItem.id !== item.id);
  };

  const createTag = (list: TagData[] = [], item: TagData) => {
    return list.concat(item);
  };

  const toggleTagId = (prevTags: TagData[] = [], tagItem: TagData) => {
    if (findSameItem(prevTags, 'id', tagItem.id) !== -1) {
      return removeTag(prevTags, tagItem);
    } else {
      return createTag(prevTags, tagItem);
    }
  };

  const toggleFilterActiveTag = (
    prevTags: TagData[] = [],
    tagItem: TagData
  ) => {
    if (findSameItem(prevTags, 'id', tagItem.id) !== -1) {
      return filter.removeFilter(tagItem.id);
    } else {
      return filter.addFilter(tagItem);
    }
  };

  const handleSelectTag = (tag: TagData) => {
    if (setSelectTag) {
      setSelectTag(prevTags => toggleTagId(prevTags, tag));
    } else {
      toggleFilterActiveTag(filter.activeFilter, tag);
    }
  };

  const resetCreateInputs = () => {
    if (tagTextRef.current && tagColorRef.current) {
      tagTextRef.current.value = '';
      tagColorRef.current.value = MAIN_COLOR;
    }
  };

  const handleCreateTag = (tagItem: TagData) => {
    if (!tagItem.tagIcoColor || !tagItem.text) {
      setAlertMessage({ message: '값을 전부 입력해주세요' });
      return openModal();
    }
    if (findSameItem(tag.tagData, 'text', tagItem.text) !== -1) {
      setAlertMessage({ message: '동일한 태그명이 존재합니다' });
      return openModal();
    }

    tag.addTag(tagItem);
    resetCreateInputs();
  };

  const handleRemoveTag = (tagItem: TagData) => {
    setAlertMessage({
      message: (
        <p>
          다른 곳에 추가된 태그일 수 있습니다.
          <br />
          정말 삭제하시겠습니까?
        </p>
      ),
      type: 'confirm',
      completeEvent: () => tag.removeTag(tagItem.id)
    });
    return openModal();
  };

  const handleEditTag = (tagItem: TagData) => {
    tag.editTag(tagItem);
  };

  const handleShowCreateTagBtn = () => {
    setShowCreateTagBtn(true);
  };

  return useObserver(() => (
    <div className="tag-area">
      <p className="tag-title">Tags</p>
      <div className="tag-list">
        {tag.tagData.map((tag: TagData, index: number) => {
          return (
            <TagItem
              key={`${tag.text}-${index}`}
              id={tag.id}
              status={
                findSameItem(
                  selectTag ? selectTag : filter.activeFilter,
                  'id',
                  tag.id
                ) !== -1
                  ? true
                  : false
              }
              tag={tag}
              isEdit={isEdit}
              handleRemoveTag={handleRemoveTag}
              handleEditTag={handleEditTag}
              onClick={() => handleSelectTag(tag)}
            />
          );
        })}
        {isEdit && (
          <div className="create-tag-area">
            {showCreateTagBtn && (
              <CreateTag
                onSave={handleCreateTag}
                tagTextRef={tagTextRef}
                tagColorRef={tagColorRef}
              />
            )}
            <button className="create-tag" onClick={handleShowCreateTagBtn}>
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line y1="8" x2="17" y2="8" stroke="white" />
                <line x1="8" y1="17" x2="8" stroke="white" />
              </svg>
            </button>
          </div>
        )}
      </div>
      {alertMessage.message && isModalVisible && (
        <Portal>
          <CommonModal
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
          >
            {alertMessage.message}
          </CommonModal>
        </Portal>
      )}
    </div>
  ));
};

export default React.memo(Tags);
