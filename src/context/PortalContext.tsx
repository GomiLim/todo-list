import React from 'react';
import { useModal, useToast } from 'hooks';

export interface ModalProps {
  isModalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  isToastVisible: boolean;
  openToast: () => void;
}

const PortalContext = React.createContext<ModalProps>({
  isModalVisible: false,
  openModal: () => undefined,
  closeModal: () => undefined,
  isToastVisible: false,
  openToast: () => undefined
});

const PortalProvider = ({ children }: { children: JSX.Element }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { isToastVisible, openToast } = useToast();

  return (
    <PortalContext.Provider
      value={{
        isModalVisible,
        openModal,
        closeModal,
        isToastVisible,
        openToast
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export { PortalContext, PortalProvider };
