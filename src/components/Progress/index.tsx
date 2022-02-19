import React, { HTMLAttributes } from 'react';

interface PropsProgress extends HTMLAttributes<HTMLDivElement> {
  label?: string | JSX.Element | JSX.Element[];
  task: string[];
}
export const Progress = (props: PropsProgress) => {
  const { task, label, ...rest } = props;
  return (
    <div {...rest}>
      <label className="progress-label" htmlFor="task">
        {label ? label : task.length}
      </label>
      <progress
        className="progress"
        id="task"
        max={task.length * 10}
        value={1 * 10}
      ></progress>
    </div>
  );
};
