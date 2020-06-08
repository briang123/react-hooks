import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useInput } from '../useInput';
// import { useInputPassRef } from '../useInputPassRef';

describe('HOOK: useInput', () => {
  let props;

  const eventResultsShape = {
    onChange: () => null,
    onFocus: () => null,
    onBlur: () => null,
    onMouseOver: () => null,
    onMouseLeave: () => null,
  };

  beforeEach(() => {
    props = {
      focus: false,
      select: false,
      initialValue: '',
      hoverBgColor: ['#FFF', '#EEE'],
      hoverTextColor: ['#000', '#000'],
      OnChange: () => null,
      OnFocus: () => null,
      OnBlur: () => null,
      OnMouseOver: () => null,
      OnMouseLeave: () => null,
    };
  });

  it('Calling hook with no arguments', () => {
    const { result, rerender } = renderHook(() => useInput(props));

    let results = {
      ref: result.current[0],
      value: result.current[1],
      bind: result.current[2],
      prop: result.current[3],
    };

    const { ref, value, bind, prop } = results;

    // console.log('results 1', results);

    expect(ref.current).toBeUndefined();
    expect(value).toBe('');
    expect(prop.hasValue).toBe(false);
    // expect(bind).toMatchObject(eventResultsShape);
    expect(prop.dirty).toBe(false);
    expect(prop.isHovered).toBe(false);
    expect(prop.focused).toBe(false);
    expect(prop.selected).toBe(false);
    expect(prop.bgColor).toBe('#FFF');
    expect(prop.color).toBe('#000');

    // const onChange = jest.fn();
    // act(() => {
    //   bind.onChange({ target: { value: 'test test test' } });
    // });
    // act(() => bind.onChange(alert('test')));

    // console.log('results 2', results);

    // expect(value).toBe('foo');
  });
});

// const [
//   inputRef,
//   inputValue,
//   bind,
//   { hasValue, dirty, isHovered, bgColor, color, focused, selected },
// ] = useInput({
//   focus,
//   select,
//   initialValue: value,
//   OnChange: onChange,
// });

// ** RETURN **
// [
//   ref,
//   value,
//   bind,
//   { hasValue, dirty, isHovered, focused, selected, bgColor, color },
// ]
