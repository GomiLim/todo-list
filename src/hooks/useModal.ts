import React from 'react';

export const useModal = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isToastVisible, setIsToastlVisible] = React.useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeToast = () => {
    setIsToastlVisible(false);
  };

  return { isModalVisible, openModal, closeModal, isToastVisible, closeToast };
};
