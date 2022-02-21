import React, { HTMLAttributes } from 'react';

interface PropsProgress extends HTMLAttributes<HTMLDivElement> {
  label?: string | JSX.Element | JSX.Element[];
  totalTodo: number;
  completeTodo: number;
}
const Progress = (props: PropsProgress) => {
  const { totalTodo, completeTodo, label, ...rest } = props;
  return (
    <div {...rest}>
      <div>
        <label className="progress-label" htmlFor="task">
          {label ? label : totalTodo}
        </label>
        <span className="progress-status">{`( ${completeTodo} / ${totalTodo} )`}</span>
      </div>
      <progress
        className="progress"
        id="task"
        max={totalTodo * 10}
        value={completeTodo * 10}
      ></progress>
    </div>
  );
};

export default React.memo(Progress);
