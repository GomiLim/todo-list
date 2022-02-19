import React from 'react';

export const useModal = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  return { isModalVisible, openModal, closeModal };
};
