import React, { useState, useRef } from 'react';
import { useFocus } from '../hooks';

export const FocusExample = ({ value, focus, select }) => {
  const [myValue, setMyValue] = useState(value);

  const ref = useRef();
  const { focused, selected, bind } = useFocus(ref, {
    select,
    focus,
  });

  const handleBooleanOutput = (value) => (value ? 'Yes' : 'No');

  return (
    <div>
      <div>Focused: {handleBooleanOutput(focused)}</div>
      <div>Selected: {handleBooleanOutput(selected)}</div>
      <input
        data-testid="myInput"
        ref={ref}
        {...bind}
        value={myValue}
        onChange={(e) => setMyValue(e.target.value)}
      />
    </div>
  );
};
