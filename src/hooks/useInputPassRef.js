import { useEffect, useMemo, useCallback, useState, useRef } from 'react';
// OnMouseEnter = ()=>null,
// OnMouseMove = () => null,
// OnMouseDown = () => null,
// OnMouseUp = () => null,
// OnMouseOut = () => null,
// OnKeyDown = () => null,
// OnKeyPress = () => null,
// OnKeyUp = () => null,
// OnTouchStart = () => null,
// OnTouchEnd = () => null,

export const useInputPassRef = (
  ref,
  {
    focus = false,
    select = false,
    initialValue = '',
    hoverBgColor = ['#FFF', '#EEE'],
    hoverTextColor = ['#000', '#000'],
    OnChange = () => null,
    OnFocus = () => null,
    OnBlur = () => null,
    OnMouseOver = () => null,
    OnMouseLeave = () => null,
  }
) => {
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [bgColor, setBgColor] = useState(hoverBgColor[0]);
  const [color, setColor] = useState(hoverTextColor[0]);

  const [val, changeValue] = useState(initialValue);

  const isNumber = typeof initial === 'number';
  const hasValue =
    val !== undefined && val !== null && (!isNumber ? val.trim && val.trim() !== '' : true);

  const handleSelection = (value) => {
    if (!ref.current) return;
    ref.current.value && setSelected(select && value);
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
      onChange: (e) => {
        OnChange(e);
        changeValue(e.target.value);
        setDirty(e.target.value !== initialValue);
      },
      onMouseOver: (e) => {
        setIsHovered(true);
        setBgColor(hoverBgColor[1]);
        setColor(hoverTextColor[1]);
        OnMouseOver(e);
      },
      onMouseLeave: (e) => {
        setIsHovered(false);
        setBgColor(hoverBgColor[0]);
        setColor(hoverTextColor[0]);
        OnMouseLeave(e);
      },
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    focus && ref.current.focus();
  }, [ref, focus]);

  useEffect(() => {
    if (!ref.current) return;
    select && selected && ref.current.select();
  }, [ref, selected]);

  return {
    val,
    bind,
    hasValue,
    dirty,
    isHovered,
    focused,
    selected,
    bgColor,
    color,
  };
};
