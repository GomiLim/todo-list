import React from 'react';
import { useModal } from 'hooks';

export interface ModalProps {
  isModalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = React.createContext<ModalProps>({
  isModalVisible: false,
  openModal: () => undefined,
  closeModal: () => undefined
});

const ModalProvider = ({ children }: { children: JSX.Element }) => {
  const { isModalVisible, openModal, closeModal } = useModal();

  return (
    <ModalContext.Provider value={{ isModalVisible, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
