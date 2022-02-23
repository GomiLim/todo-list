import React from 'react';

const EmptyContent = ({ children }: { children: JSX.Element | string }) => {
  return <div className="empty-area">{children}</div>;
};

export default React.memo(EmptyContent);
