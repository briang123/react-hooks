import React, { useState, useCallback, forwardRef } from 'react';
import {
  useInput,
  useHover,
  useHoverExposedMouseEvents,
  useFocus,
  useInputChange,
  useSyncedRef,
} from '../hooks';
// import { useHoverExposedMouseEvents } from '../hooks/useHoverExposedMouseEvents';
// import { useFocus, useInput2, useSyncedRef } from '../hooks/useInput';

export const FocusSelect = () => {
  const [myValue, setMyValue] = useState('');

  const disableInput = () => myValue === 'disable input';

  const handleChange = (e) => {
    console.log('handleChange', e.target.value);
    setMyValue(e.target.value);
  };
  const handleBlur = (e) => {
    // console.log('handleBlur', e.target.value);
  };
  const handleFocus = (e) => {
    // console.log('handleFocus', e.target.value);
  };
  const handleMouseDown = (e) => {
    // console.log('handleMouseDown', e.currentTarget);
  };
  const handleMouseOver = (e) => {
    // console.log('handleMouseOver', e.currentTarget);
  };
  const handleMouseLeave = (e) => {
    // console.log('handleMouseLeave', e.currentTarget);
  };

  // const [
  //   inputRef,
  //   myInputValue,
  //   { hasValue: hasValue1, focused: focused1, selected: selected1, disabled, inputEvents: events1 },
  // ] = useInput({
  //   focus: false,
  //   select: true,
  //   disable: disableInput(),
  //   initialValue: '',
  //   OnChange: handleChange,
  //   OnBlur: handleBlur,
  //   OnFocus: handleFocus,
  // });

  // const [isHovered1, hoverEvents1] = useHoverExposedMouseEvents({
  //   OnMouseOver: handleMouseOver,
  //   OnMouseLeave: handleMouseLeave,
  // });

  // const [
  //   inputRef,
  //   myInputValue,
  //   { hasValue: hasValue1, dirty: dirty1, disabled, inputEvents: inputEvents1 },
  // ] = useInput2({
  //   disable: disableInput(),
  //   initialValue: 'test',
  //   OnChange: handleChange,
  //   OnMouseDown: handleMouseDown,
  // });

  const [
    input1,
    value1,
    events1,
    {
      hasValue: hasValue1,
      dirty: dirty1,
      isHovered: isHovered1,
      bgColor: bgColor1,
      color: color1,
      focused: focused1,
      selected: selected1,
    },
  ] = useInput({
    disable: disableInput(),
    focus: true,
    select: true,
    initialValue: 'test',
    // hoverBgColor: ['#dd99aa', '#a05'],
    // hoverTextColor: ['#000', '#fff'],
    OnChange: handleChange,
    OnMouseDown: handleMouseDown,
  });

  const [
    input2,
    value2,
    events2,
    {
      hasValue: hasValue2,
      dirty: dirty2,
      isHovered: isHovered2,
      bgColor: bgColor2,
      color: color2,
      focused: focused2,
      selected: selected2,
    },
  ] = useInput({
    disable: disableInput(),
    focus: false,
    select: false,
    initialValue: '',
    // hoverBgColor: ['#dd99aa', '#a05'],
    // hoverTextColor: ['#000', '#fff'],
    OnChange: handleChange,
    OnMouseDown: handleMouseDown,
  });

  // const mynewRef = useSyncedRef(inputRef);
  // console.log('useSyncedRef', inputRef, mynewRef);

  // const [dummy, { focused: focused1, selected: selected1, focusEvents: focusEvents1 }] = useFocus({
  //   outerRef: inputRef,
  //   focus: false,
  //   select: true,
  //   // OnBlur: handleBlur,
  //   // OnFocus: handleFocus,
  // });

  // const [inputRef2, { focused: focused2, selected: selected2, focusEvents: events2 }] = useFocus({
  //   focus: false,
  //   select: true,
  //   OnBlur: handleBlur,
  //   OnFocus: handleFocus,
  // });

  // console.log('1', { myInputValue, hasValue1, focused1, selected1, disabled, events1 });
  // console.log('2', { focused2, selected2, events2 });
  const showInput = true;
  return (
    showInput && (
      <div>
        Focused: ({focused1 ? 'Yes' : 'No'})<br />
        Selected: ({selected1 ? 'Yes' : 'No'})<br />
        Has Value: ({hasValue1 ? 'Yes' : 'No'})<br />
        Is Dirty: ({dirty1 ? 'Yes' : 'No'})<br />
        Hovered: ({isHovered1 ? 'Yes' : 'No'})<br />
        <input
          ref={input1}
          {...events1}
          value={value1}
          style={{ background: bgColor1, color: color1 }}
        />
        <br />
        Focused: ({focused2 ? 'Yes' : 'No'})<br />
        Selected: ({selected2 ? 'Yes' : 'No'})<br />
        Has Value: ({hasValue2 ? 'Yes' : 'No'})<br />
        Is Dirty: ({dirty2 ? 'Yes' : 'No'})<br />
        Hovered: ({isHovered2 ? 'Yes' : 'No'})<br />
        <input
          ref={input2}
          {...events2}
          value={value2}
          style={{
            background: bgColor2,
            color: color2,
          }}
        />
        {/* <input
          ref={input1}
          {...inputEvents1}
          {...focusEvents1}
          {...hoverEvents1}
          value={myInputValue}
          disabled={disabled}
          style={{ background: isHovered1 ? 'yellow' : 'white' }}
        /> */}
        {/* <br />
        Focused2: ({focused2 ? 'Yes' : 'No'})<br />
        Selected2: ({selected2 ? 'Yes' : 'No'})<br />
        <input ref={inputRef2} {...events2} /> */}
      </div>
    )
  );
};
