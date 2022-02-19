import React from 'react';
import { Progress as TaskProgress, Today } from 'components';

export const Header = () => {
  const task = ['1', '2', '3', '4'];
  return (
    <div className="header-area">
      <div className="today-area">
        <p className="today-title">today</p>
        <Today timezoneFormat="dd m-contraction" />
      </div>
      <TaskProgress
        className="task-progress-area"
        label={`${task.length} Task`}
        task={task}
      />
    </div>
  );
};
