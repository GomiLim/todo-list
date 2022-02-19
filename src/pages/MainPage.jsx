import React, { useContext } from 'react';
import { Modal } from 'containers';
import { ModalContext } from 'context/ModalContext';

const MainPage = () => {
  const { isModalVisible, closeModal, openModal } = useContext(ModalContext);
  return (
    <div>
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

export default MainPage;
