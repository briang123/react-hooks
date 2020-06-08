import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useInputPassRef } from '../hooks';

export const InputExamplePassRef = ({ value, focus, select, onChange }) => {
  // if (!value || !onChange) console.error('Invalid props');

  const ref = useRef();
  const {
    val,
    bind,
    hasValue,
    dirty,
    isHovered,
    bgColor,
    color,
    focused,
    selected,
  } = useInputPassRef(ref, {
    focus,
    select,
    initialValue: value,
    OnChange: onChange,
  });

  const handleBooleanOutput = (value) => (value ? 'Yes' : 'No');

  return (
    <div>
      <div>Has Value: {handleBooleanOutput(hasValue)}</div>
      <div>Is Dirty: {handleBooleanOutput(dirty)}</div>
      <div>Is Hovered: {handleBooleanOutput(isHovered)}</div>
      <div>Background Color: {bgColor}</div>
      <div>Text Color: {color}</div>
      <div>Focused: {handleBooleanOutput(focused)}</div>
      <div>Selected: {handleBooleanOutput(selected)}</div>
      <input
        data-testid="myInput"
        ref={ref}
        {...bind}
        value={val}
        style={{ background: bgColor, color: color }}
      />
    </div>
  );
};

InputExamplePassRef.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  focus: PropTypes.bool,
  select: PropTypes.bool,
};

InputExamplePassRef.defaultProps = {
  onChange: () => null,
  value: '',
  focus: false,
  select: false,
};
