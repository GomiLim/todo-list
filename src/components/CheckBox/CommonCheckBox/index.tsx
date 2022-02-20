import {
  MAIN_COLOR,
  SECONDARY_COLOR_GRAY_2,
  SECONDARY_COLOR_WHITE
} from 'libs/constant';
import React from 'react';
import styled from 'styled-components';

interface PropsCheckBox {
  id: string;
}
const StyledCheckBox = styled.div<{ inputId: string }>`
  input[type='checkbox'] {
    display: none;
  }
  input[type='checkbox'] + label {
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    width: 30px;
    height: 30px;

    background: ${SECONDARY_COLOR_WHITE};
    border: 1px solid ${SECONDARY_COLOR_GRAY_2};
    border-radius: 5px;
    color: ${SECONDARY_COLOR_WHITE};

    transition: 0.3s;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      pointer-events: none;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background-color: ${MAIN_COLOR};
      text-align: center;
      right: -3px;
      bottom: -3px;
      transition: 0.2s;
    }

    .ico-check {
      display: none;
      pointer-events: none;
      transform-origin: center;
      transform: scale(0);
      transition: 0.3s;
    }
  }

  input[id=${props => props.inputId}]:checked + label {
    position: relative;
    background: ${MAIN_COLOR};
    border: 1px solid ${MAIN_COLOR};

    .ico-check {
      display: block;
      transform: scale(1);
    }

    &::after {
      content: '';
      pointer-events: none;
      width: 30px;
      height: 30px;
      background-color: transparent;
      text-align: center;
      position: absolute;
    }
  }
`;
const CommonCheckBox = (props: PropsCheckBox) => {
  const { id } = props;
  return (
    <StyledCheckBox className="common-checkbox" inputId={id}>
      <input type="checkbox" id={id} />
      <label htmlFor={id} className="common-checkbox-label">
        <svg
          className="ico-check"
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 6.5C6.5 13 4 15.5 16.5 1.5"
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>
      </label>
    </StyledCheckBox>
  );
};

export default React.memo(CommonCheckBox);
