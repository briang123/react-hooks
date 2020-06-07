import { useEffect, useCallback, useState, useRef } from 'react';
import { useSyncedRef, useFocusState, useFocus } from 'hooks';

// TODO: NOT WORKING AS EXPECTED (useFocus hook doesn't seem to be getting the reference)
export const useInputWithNestedHooks = ({
  focus = false,
  select = false,
  disable = false,
  initialValue = '',
  OnChange = () => null,
  OnFocus = () => null,
  OnBlur = () => null,
}) => {
  const ref = useRef(null);

  const { focused, selected, focusEvents } = useFocus({
    outerRef: ref,
    focus,
    select,
    onFocus: OnFocus,
    onBlur: OnBlur,
  });

  //console.log('useInput hook', { focused, selected, focusEvents });
  // const [focused, setFocused] = useState(false);
  // const [selected, setSelected] = useState(false);
  const [value, changeValue] = useState(initialValue);
  const isNumber = typeof initial === 'number';
  const hasValue =
    value !== undefined && value !== null && (!isNumber ? value.trim && value.trim() !== '' : true);

  const inputEvents = {
    // onFocus: (e) => {
    //   // setFocused(inputFocused);
    //   // handleSelection(select);
    //   OnFocus(e);
    // },
    // onBlur: (e) => {
    //   // setFocused(inputFocused);
    //   // handleSelection(false);
    //   OnBlur(e);
    // },
    ...focusEvents,
    onChange: useCallback((e) => {
      OnChange(e);
      changeValue(e.target.value);
    }, []),
  };

  // const handleSelection = (value) => {
  //   if (!ref.current) return;
  //   ref.current.value && setSelected(select && value);
  // };

  // useEffect(() => {
  //   if (!ref.current) return;
  //   focus && ref.current.focus();
  // }, [ref, focus]);

  // useEffect(() => {
  //   if (!ref.current) return;
  //   select && selected && ref.current.select();
  // }, [ref, selected]);

  return [
    ref,
    value,
    {
      hasValue,
      focused,
      selected,
      disabled: disable,
      inputEvents,
    },
  ];
};
