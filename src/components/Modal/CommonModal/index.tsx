import React, { HTMLAttributes, useContext } from 'react';
import { PortalContext } from 'context/PortalContext';
import { alertMessageInterface } from 'models';

interface PropsCommonModal extends HTMLAttributes<HTMLDivElement> {
  alertMessage: alertMessageInterface;
  children: JSX.Element | JSX.Element[] | string;
  setAlertMessage: React.Dispatch<React.SetStateAction<alertMessageInterface>>;
}
const CommonModal = (props: PropsCommonModal) => {
  const { alertMessage, children, setAlertMessage, ...rest } = props;
  const isconfirmType = alertMessage.type === 'confirm' ? true : false;
  const { closeModal } = useContext(PortalContext);

  const handleCompleteEvent = () => {
    alertMessage.completeEvent && alertMessage.completeEvent();
    setAlertMessage({ message: '' });
    closeModal();
  };
  const handleCancelEvent = () => {
    alertMessage.cancelEvent && alertMessage.cancelEvent();
    setAlertMessage({ message: '' });
    closeModal();
  };

  return (
    <div className="modal-content-area" {...rest}>
      <div className="modal-content">{children}</div>
      <div className="modal-button-area">
        <button className="modal-button-ok" onClick={handleCompleteEvent}>
          확인
        </button>
        {isconfirmType && (
          <button className="modal-button-cancel" onClick={handleCancelEvent}>
            취소
          </button>
        )}
      </div>
    </div>
  );
};

export default CommonModal;
