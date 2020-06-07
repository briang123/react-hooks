import { useEffect, useCallback, useState } from 'react';
import { useSyncedRef } from 'hooks';

export const useFocus = ({
  outerRef = null,
  focus = false,
  select = false,
  OnFocus = () => null,
  OnBlur = () => null,
}) => {
  console.log('select', select);
  const ref = useSyncedRef(outerRef);
  // console.log(ref, outerRef);
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleSelection = (value) => {
    console.log('handleSelection', { refCurrent: ref.current, select, value });
    if (!ref.current) return;
    ref.current.value && setSelected(select && value);
  };

  const focusEvents = {
    onFocus: useCallback(
      (e) => {
        console.log('onfocus', { select, selected });
        setFocused(true);
        handleSelection(select);
        OnFocus(e);
      },
      [focused]
    ),
    onBlur: useCallback(
      (e) => {
        console.log('onblur', { select, selected });
        setFocused(false);
        handleSelection(false);
        OnBlur(e);
      },
      [focused, selected]
    ),
  };

  useEffect(() => {
    if (!ref.current) return;
    focus && ref.current.focus();
  }, [ref, focused]);

  useEffect(() => {
    console.log(ref);
    if (!ref.current) return;
    select && selected && ref.current.select();
  }, [ref, selected]);

  // console.log('useFocus hook', { focused, selected, focusEvents });
  return [ref, { focused, selected, focusEvents }];
};
