import React, { useRef, useEffect, useState, useContext } from 'react';
import { CommonModal, TagItem } from 'components';
import { findSameItem } from 'libs/utill';
import { CreateTag } from 'components/Inputs';
import { MAIN_COLOR } from 'libs/constant';
import { PortalContext } from 'context/PortalContext';
import { Portal } from 'containers';

import { alertMessageInterface, TagItemInterface } from 'models';

interface PropsTags {
  setTagList: React.Dispatch<React.SetStateAction<TagItemInterface[]>>;
  tagList: TagItemInterface[];
  setSelectTag?: React.Dispatch<React.SetStateAction<TagItemInterface[]>>;
  selectTag?: TagItemInterface[];
  setFilter?: React.Dispatch<React.SetStateAction<TagItemInterface[]>>;
  filter?: TagItemInterface[];
  isEdit?: boolean;
}

const Tags = (props: PropsTags) => {
  const {
    setTagList,
    tagList,
    setSelectTag,
    selectTag,
    setFilter,
    filter,
    isEdit = false
  } = props;

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

  const removeTag = (list: TagItemInterface[], item: TagItemInterface) => {
    return list.filter((prevItem: TagItemInterface) => prevItem.id !== item.id);
  };

  const createTag = (list: TagItemInterface[] = [], item: TagItemInterface) => {
    return list.concat(item);
  };

  const editTag = (list: TagItemInterface[], tag: TagItemInterface) => {
    const updateText = list.map(prevTag => {
      if (prevTag.id === tag.id) {
        return tag;
      }
      return prevTag;
    });
    return updateText;
  };

  const toggleTagId = (
    prevTags: TagItemInterface[] = [],
    tag: TagItemInterface
  ) => {
    if (findSameItem(prevTags, 'id', tag.id) !== -1) {
      return removeTag(prevTags, tag);
    } else {
      return createTag(prevTags, tag);
    }
  };

  const handleSelectTag = (tag: TagItemInterface) => {
    if (setFilter) {
      setFilter(prevTags => toggleTagId(prevTags, tag));
    }

    if (setSelectTag) {
      setSelectTag(prevTags => toggleTagId(prevTags, tag));
    }
  };

  const resetCreateInputs = () => {
    if (tagTextRef.current && tagColorRef.current) {
      tagTextRef.current.value = '';
      tagColorRef.current.value = MAIN_COLOR;
    }
  };

  const handleCreateTag = (tag: TagItemInterface) => {
    if (!tag.tagIcoColor || !tag.text) {
      setAlertMessage({ message: '값을 전부 입력해주세요' });
      return openModal();
    }
    if (findSameItem(tagList, 'text', tag.text) !== -1) {
      setAlertMessage({ message: '동일한 태그명이 존재합니다' });
      return openModal();
    }

    setTagList(prevTags => createTag(prevTags, tag));
    resetCreateInputs();
  };

  const handleRemoveTag = (tag: TagItemInterface) => {
    setAlertMessage({
      message: (
        <p>
          다른 곳에 추가된 태그일 수 있습니다.
          <br />
          정말 삭제하시겠습니까?
        </p>
      ),
      type: 'confirm',
      completeEvent: () => setTagList(prevTags => removeTag(prevTags, tag))
    });
    return openModal();
  };

  const handleEditTag = (tag: TagItemInterface) => {
    setTagList((prev: TagItemInterface[]) => editTag(prev, tag));
  };

  const handleShowCreateTagBtn = () => {
    setShowCreateTagBtn(true);
  };

  useEffect(() => {
    localStorage.setItem('active-filter', JSON.stringify(filter));
  }, [filter]);

  useEffect(() => {
    localStorage.setItem('tag-list', JSON.stringify(tagList));
  }, [tagList, setTagList]);

  return (
    <div className="tag-area">
      <p className="tag-title">Tags</p>
      <div className="tag-list">
        {tagList.map((tag: TagItemInterface, index: number) => {
          return (
            <TagItem
              key={`${tag.text}-${index}`}
              id={tag.id}
              status={
                findSameItem(filter ?? selectTag, 'id', tag.id) !== -1
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
  );
};

export default React.memo(Tags);
