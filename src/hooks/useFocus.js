import { useEffect, useMemo, useState } from 'react';

export const useFocus = (
  ref,
  { focus = false, select = false, OnFocus = () => null, OnBlur = () => null }
) => {
  const [focused, setFocused] = useState(focus);
  const [selected, setSelected] = useState(select);

  const handleSelection = (value) => {
    if (!ref.current) return;
    ref.current.value ? setSelected(select && value) : setSelected(false);
  };

  const bind = useMemo(() => {
    return {
      onFocus: (e) => {
        setFocused(true);
        handleSelection(true);
        OnFocus(e);
      },
      onBlur: (e) => {
        setFocused(false);
        handleSelection(false);
        OnBlur(e);
      },
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    focused && ref.current.focus();
  }, [focused]);

  useEffect(() => {
    if (!ref.current) return;
    selected && selected && ref.current.select();
  }, [selected]);

  return { focused, selected, bind };
};
