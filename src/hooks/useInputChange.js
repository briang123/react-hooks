import { useCallback, useState, useRef } from 'react';

export const useInputChange = ({
  disable = false,
  initialValue = '',
  OnChange = () => null,
  OnMouseDown = () => null,
}) => {
  const ref = useRef(null);
  const [value, setValue] = useState(initialValue);
  const [dirty, setDirty] = useState(false);
  const isNumber = typeof initial === 'number';
  const hasValue =
    value !== undefined && value !== null && (!isNumber ? value.trim && value.trim() !== '' : true);

  const inputEvents = {
    onChange: useCallback(
      (e) => {
        OnChange(e);
        setValue(e.target.value);
        setDirty(e.target.value !== initialValue);
      },
      [value]
    ),
    onMouseDown: useCallback((e) => {
      OnMouseDown(e);
    }, []),
  };

  return [
    ref,
    value,
    {
      hasValue,
      dirty,
      disabled: disable,
      inputEvents,
    },
  ];
};
