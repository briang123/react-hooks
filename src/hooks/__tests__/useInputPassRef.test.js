import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useInputPassRef } from '../useInputPassRef';

describe('HOOK: useInputPassRef', () => {
  let props, ref;

  beforeEach(() => {
    ref = { current: { value: '', focus: jest.fn(), select: jest.fn() } };

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

  // it('Should match snapshot', () => {
  //   expect(renderHook(() => useInputPassRef(ref, props))).toMatchSnapshot();
  // });

  it('Calling hook with default args then changing value', () => {
    const { result } = renderHook(() => useInputPassRef(ref, props));

    // assert default behavior with default args
    expect(ref.current).not.toBeUndefined();
    expect(result.current.val).toBe('');
    expect(result.current.hasValue).toBe(false);
    expect(result.current.dirty).toBe(false);
    expect(result.current.isHovered).toBe(false);
    expect(result.current.focused).toBe(false);
    expect(result.current.selected).toBe(false);
    expect(result.current.bgColor).toBe('#FFF');
    expect(result.current.color).toBe('#000');

    // assert that hover is triggered on/off
    act(() => {
      result.current.bind.onMouseOver();
    });

    expect(result.current.val).toBe('');
    expect(result.current.hasValue).toBe(false);
    expect(result.current.dirty).toBe(false);
    expect(result.current.isHovered).toBe(true);
    expect(result.current.focused).toBe(false);
    expect(result.current.selected).toBe(false);
    expect(result.current.bgColor).toBe('#EEE');
    expect(result.current.color).toBe('#000');

    act(() => {
      result.current.bind.onMouseLeave();
    });

    expect(result.current.val).toBe('');
    expect(result.current.hasValue).toBe(false);
    expect(result.current.dirty).toBe(false);
    expect(result.current.isHovered).toBe(false);
    expect(result.current.focused).toBe(false);
    expect(result.current.selected).toBe(false);
    expect(result.current.bgColor).toBe('#FFF');
    expect(result.current.color).toBe('#000');

    // assert value is changed
    act(() => {
      result.current.bind.onFocus();
      result.current.bind.onChange({ target: { value: 'foo' } });
    });

    expect(result.current.val).toBe('foo');
    expect(result.current.hasValue).toBe(true);
    expect(result.current.dirty).toBe(true);
    expect(result.current.isHovered).toBe(false);
    expect(result.current.focused).toBe(true);
    expect(result.current.selected).toBe(false);
    expect(result.current.bgColor).toBe('#FFF');
    expect(result.current.color).toBe('#000');

    // assert leaving the input
    act(() => {
      result.current.bind.onBlur();
    });

    expect(result.current.val).toBe('foo');
    expect(result.current.hasValue).toBe(true);
    expect(result.current.dirty).toBe(true);
    expect(result.current.isHovered).toBe(false);
    expect(result.current.focused).toBe(false);
    expect(result.current.selected).toBe(false);
    expect(result.current.bgColor).toBe('#FFF');
    expect(result.current.color).toBe('#000');

    // assert changing value back to original value
    act(() => {
      result.current.bind.onFocus();
      result.current.bind.onChange({ target: { value: '' } });
    });

    expect(result.current.val).toBe('');
    expect(result.current.hasValue).toBe(false);
    expect(result.current.dirty).toBe(false);
    expect(result.current.isHovered).toBe(false);
    expect(result.current.focused).toBe(true);
    expect(result.current.selected).toBe(false);
    expect(result.current.bgColor).toBe('#FFF');
    expect(result.current.color).toBe('#000');

    expect(result).toMatchSnapshot();
  });

  it('Calling with initial value of foo, changing it, and listening for change event', () => {
    ref.current.value = 'foo';
    props.OnChange = jest.fn();
    props.initialValue = ref.current.value;
    const { result } = renderHook(() => useInputPassRef(ref, props));

    // assert default behavior with default args
    expect(ref.current).not.toBeUndefined();
    expect(result.current.val).toBe('foo');
    expect(result.current.hasValue).toBe(true);
    expect(result.current.dirty).toBe(false);
    expect(result.current.isHovered).toBe(false);
    expect(result.current.focused).toBe(false);
    expect(result.current.selected).toBe(false);
    expect(result.current.bgColor).toBe('#FFF');
    expect(result.current.color).toBe('#000');

    // assert changing initial value
    act(() => {
      result.current.bind.onFocus();
      result.current.bind.onChange({ target: { value: 'foobar' } });
    });

    expect(props.OnChange).toBeCalledTimes(1);
    expect(result.current.val).toBe('foobar');
    expect(result.current.hasValue).toBe(true);
    expect(result.current.dirty).toBe(true);
    expect(result.current.isHovered).toBe(false);
    expect(result.current.focused).toBe(true);
    expect(result.current.selected).toBe(false);
    expect(result.current.bgColor).toBe('#FFF');
    expect(result.current.color).toBe('#000');

    expect(result).toMatchSnapshot();
  });

  it('Calling with initial value of foo, focusing and selecting by default', () => {
    ref.current.value = 'foo';
    props = {
      initialValue: ref.current.value,
      focus: true,
      select: true,
    };

    const { result } = renderHook(() => useInputPassRef(ref, props));

    act(() => {
      result.current.bind.onFocus();
    });

    // assert initial value of foo that has focus and is selected
    expect(ref.current).not.toBeUndefined();
    expect(result.current.val).toBe('foo');
    expect(result.current.hasValue).toBe(true);
    expect(result.current.dirty).toBe(false);
    expect(result.current.isHovered).toBe(false);
    expect(result.current.focused).toBe(true);
    expect(result.current.selected).toBe(true);
    expect(result.current.bgColor).toBe('#FFF');
    expect(result.current.color).toBe('#000');

    expect(result).toMatchSnapshot();
  });
});
