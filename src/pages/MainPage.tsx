import React, { useState } from 'react';
import { Header, Tags } from 'containers';

import { PropsTagItem } from 'models';

const MainPage = () => {
  const [tagList, setTagList] = useState<PropsTagItem[]>(
    JSON.parse(localStorage.getItem('tag-list') as string) ?? []
  );
  const [filter, setFilter] = useState<PropsTagItem[]>([]);

  const removeItem = (list: PropsTagItem[], item: PropsTagItem) => {
    return list.filter((prevItem: PropsTagItem) => prevItem.id !== item.id);
  };

  const createItem = (list: PropsTagItem[] = [], item: PropsTagItem) => {
    return list.concat(item);
  };

  return (
    <div className="main-page">
      <Header />
      <Tags
        tagList={tagList}
        setTagList={setTagList}
        setFilter={setFilter}
        removeTag={removeItem}
        createTag={createItem}
        filter={filter}
      />
      <div>메인페이지</div>
    </div>
  );
};

export default React.memo(MainPage);
