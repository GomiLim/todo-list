import React from 'react';
import { PropsTagItem, PropsTagList } from 'models';
import { TagItem } from 'components';

interface PropsTags extends PropsTagList {
  onClick: (tag: PropsTagItem) => void;
}
const Tags = (props: PropsTags) => {
  const { tagList, onClick } = props;

  return (
    <div className="tag-area">
      <p className="tag-title">Tags</p>
      <div className="tag-list">
        {tagList.map((tag: PropsTagItem, index: number) => {
          return (
            <TagItem
              key={`${tag.text}-${index}`}
              tagIcoColor={tag.tagIcoColor}
              text={tag.text}
              status={tag.status}
              onClick={() => onClick(tag)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(Tags);
