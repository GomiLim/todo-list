import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export const Modal = ({ children }: { children: JSX.Element }) => {
  const modalRoot = document.getElementById('global-modal');
  const modalChild = document.createElement('div');
  useEffect(() => {
    modalRoot?.appendChild(modalChild);

    return () => {
      modalRoot?.removeChild(modalChild);
    };
  }, []);

  return ReactDOM.createPortal(children, modalChild);
};
