import React from 'react';
import PropTypes from 'prop-types';
import { useInput } from '../hooks';

export const InputExample = ({ value, focus, select, onChange }) => {
  // if (!value || !onChange) console.error('Invalid props');

  const [
    inputRef,
    inputValue,
    bind,
    { hasValue, dirty, isHovered, bgColor, color, focused, selected },
  ] = useInput({
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
        ref={inputRef}
        {...bind}
        value={inputValue}
        style={{ background: bgColor, color: color }}
      />
    </div>
  );
};

InputExample.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  focus: PropTypes.bool,
  select: PropTypes.bool,
};

InputExample.defaultProps = {
  onChange: () => null,
  value: '',
  focus: false,
  select: false,
};
