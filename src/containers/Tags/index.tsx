import React, { useRef, useEffect, useState } from 'react';
import { PropsTagItem, PropsTagList } from 'models';
import { TagItem } from 'components';
import { findSameItem } from 'libs/utill';
import { CreateTag } from 'components/Inputs';
import { MAIN_COLOR } from 'libs/constant';

interface PropsTags extends PropsTagList {
  setTagList: React.Dispatch<React.SetStateAction<PropsTagItem[]>>;
  setFilter?: React.Dispatch<React.SetStateAction<PropsTagItem[]>>;
  filter?: PropsTagItem[];
  isEdit?: boolean;
  setSelectTag?: React.Dispatch<React.SetStateAction<PropsTagItem[]>>;
  selectTag?: PropsTagItem[];
}

const Tags = (props: PropsTags) => {
  const {
    tagList,
    setTagList,
    filter,
    setFilter,
    isEdit = false,
    setSelectTag,
    selectTag
  } = props;

  const [showCreatTagBtn, setShowCreatTagBtn] = useState(false);

  const tagTextRef = useRef<HTMLInputElement>(null);
  const tagColorRef = useRef<HTMLInputElement>(null);

  const removeTag = (list: PropsTagItem[], item: PropsTagItem) => {
    return list.filter((prevItem: PropsTagItem) => prevItem.id !== item.id);
  };

  const createTag = (list: PropsTagItem[] = [], item: PropsTagItem) => {
    return list.concat(item);
  };

  const toggleTagId = (prevTags: PropsTagItem[] = [], tag: PropsTagItem) => {
    if (findSameItem(prevTags, 'id', tag.id) !== -1) {
      return removeTag(prevTags, tag);
    } else {
      return createTag(prevTags, tag);
    }
  };

  const handleSelectTag = (tag: PropsTagItem) => {
    if (setFilter) {
      setFilter(prevTags => toggleTagId(prevTags, tag));
    }

    if (setSelectTag) {
      setSelectTag(prevTags => toggleTagId(prevTags, tag));
    }
  };

  const resetCreatInputs = () => {
    if (tagTextRef.current && tagColorRef.current) {
      tagTextRef.current.value = '';
      tagColorRef.current.value = MAIN_COLOR;
    }
  };

  const handleCreateTag = (tag: PropsTagItem) => {
    if (!tag.tagIcoColor || !tag.text) return alert('값을 전부 입력해주세요');
    if (findSameItem(tagList, 'text', tag.text) !== -1) {
      return alert('동일한 태그명이 존재합니다.');
    }

    setTagList(prevTags => createTag(prevTags, tag));
    resetCreatInputs();
  };

  const handleShowCreatTagBtn = () => {
    setShowCreatTagBtn(true);
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
        {tagList.map((tag: PropsTagItem, index: number) => {
          return (
            <TagItem
              key={`${tag.text}-${index}`}
              id={tag.id}
              status={
                findSameItem(filter ?? selectTag, 'id', tag.id) !== -1
                  ? true
                  : false
              }
              tagIcoColor={tag.tagIcoColor}
              text={tag.text}
              onClick={() => handleSelectTag(tag)}
            />
          );
        })}
        {isEdit && (
          <div className="create-tag-area">
            {showCreatTagBtn && (
              <CreateTag
                onSave={handleCreateTag}
                tagTextRef={tagTextRef}
                tagColorRef={tagColorRef}
              />
            )}
            <button className="creat-tag" onClick={handleShowCreatTagBtn}>
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
    </div>
  );
};

export default React.memo(Tags);
