import React, { HTMLAttributes } from 'react';

interface PropsEmptyContent extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[] | string;
}
const EmptyContent = (props: PropsEmptyContent) => {
  const { children, ...rest } = props;
  return (
    <div className="empty-area" {...rest}>
      {children}
    </div>
  );
};

export default React.memo(EmptyContent);
