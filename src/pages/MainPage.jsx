import React, { useContext, useState } from 'react';
import { Modal } from 'containers';
import { ModalContext } from 'context/ModalContext';
import { Header, Tags } from 'containers';

import { PropsTagItem } from 'models';

const MainPage = () => {
  const tagList = [
    { tagIcoColor: 'red', text: '태그1', status: 'active', id: 1 },
    { tagIcoColor: 'blue', text: '태그2', status: 'inactive', id: 2 },
    { tagIcoColor: 'skyblue', text: '태그3', status: 'inactive', id: 3 }
  ];

  const [atagList, setTagList] = useState(tagList);
  const { isModalVisible, closeModal, openModal } = useContext(ModalContext);

  const handleSelectTag = (tag: PropsTagItem) => {
    const tagStatus = tag.status === 'active' ? 'inactive' : 'active';

    setTagList(prev => {
      const findTag = prev.map(prevTag => {
        if (prevTag.id === tag.id) {
          return { ...prevTag, status: tagStatus };
        } else {
          return prevTag;
        }
      });

      return findTag;
    });
  };

  return (
    <div className="main-page">
      <Header />
      <Tags
        tagList={atagList}
        setTagList={setTagList}
        onClick={handleSelectTag}
      />
      <div>메인페이지</div>
      <button onClick={() => openModal()}>모달 오픈</button>
      {isModalVisible && (
        <Modal>
          <div>모달</div>
          <button onClick={() => closeModal()}>닫기</button>
        </Modal>
      )}
    </div>
  );
};

export default React.memo(MainPage);
