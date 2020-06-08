import { renderHook, act } from '@testing-library/react-hooks';
import { useFocus } from '../useFocus';

describe('Testing the useFocus custom hook', () => {
  let props, ref;

  beforeEach(() => {
    ref = { current: { value: '', focus: jest.fn(), select: jest.fn() } };

    props = {
      focus: false,
      select: false,
      OnFocus: () => null,
      OnBlur: () => null,
    };
  });

  it('Element should have focus, but not selected b/c no value', () => {
    const { result } = renderHook(() => useFocus(ref, props));

    expect(result.current.focused).toBe(false);
    expect(result.current.selected).toBe(false);

    // assert setting focus and checking value
    act(() => {
      result.current.bind.onFocus();
    });

    expect(result.current.focused).toBe(true);
    expect(result.current.selected).toBe(false);

    // assert leaving the element
    act(() => {
      result.current.bind.onBlur();
    });

    expect(result.current.focused).toBe(false);
    expect(result.current.selected).toBe(false);
  });

  it('Element should trigger OnFocus callback event', () => {
    props.OnFocus = jest.fn();
    const { result } = renderHook(() => useFocus(ref, props));

    expect(result.current.focused).toBe(false);
    expect(result.current.selected).toBe(false);

    act(() => {
      result.current.bind.onFocus();
    });

    expect(props.OnFocus).toBeCalledTimes(1);
  });

  it('Element with initial value, focus=true, select=true then clearing out value should work', () => {
    ref.current.value = 'foo';
    props = {
      focus: true,
      select: true,
    };
    const { result } = renderHook(() => useFocus(ref, props));

    // assert initial value of foo that has focus and is selected
    expect(result.current.focused).toBe(true);
    expect(result.current.selected).toBe(true);

    // assert leaving the element
    act(() => {
      result.current.bind.onBlur();
    });

    expect(result.current.focused).toBe(false);
    expect(result.current.selected).toBe(false);

    // assert clearing out the value
    act(() => {
      result.current.bind.onFocus();
      ref.current.value = '';
    });

    expect(result.current.focused).toBe(true);
    expect(result.current.selected).toBe(true);

    // assert leaving the element
    act(() => {
      result.current.bind.onBlur();
    });

    expect(result.current.focused).toBe(false);
    expect(result.current.selected).toBe(false);
  });
});
