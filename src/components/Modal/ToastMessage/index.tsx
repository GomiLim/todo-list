import React from 'react';

const ToastMessage = ({ children }: { children: JSX.Element }) => {
  return <div className="toast-message">{children}</div>;
};

export default React.memo(ToastMessage);
