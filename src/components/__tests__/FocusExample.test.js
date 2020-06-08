import React, { useRef } from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { FocusExample } from '../FocusExample';

describe('FocusExample integration test using the useFocus custom hook', () => {
  let focused, selected, input;
  // let ref = { current: { value: '', focus: jest.fn(), select: jest.fn() } };

  const initializeElements = (getByText, getByTestId) => {
    focused = getByText(/focused/i);
    selected = getByText(/selected/i);
    input = getByTestId('myInput');
  };

  afterEach(() => {
    cleanup();
  });

  describe('<FocusExample />', () => {
    beforeEach(() => {
      let { getByText, getByTestId } = render(<FocusExample />);
      initializeElements(getByText, getByTestId);
    });

    it('Should match snapshot', () => {
      expect(<FocusExample />).toMatchSnapshot();
    });

    describe('Should handle default behaviors', () => {
      it('Should load with default behavior', () => {
        expect(focused).toHaveTextContent(`Focused: No`);
        expect(selected).toHaveTextContent(`Selected: No`);
        expect(input).toHaveValue('');
      });

      it('Should handle setting focus on input without value for component', () => {
        fireEvent.focus(input);
        expect(selected).toHaveTextContent(`Selected: No`);
        expect(focused).toHaveTextContent(`Focused: Yes`);
        expect(input).toHaveValue('');
      });
    });

    describe('No props passed to component, but we change value and see focus toggle', () => {
      beforeEach(() => {
        fireEvent.focus(input);
        input.value = 'foo';
      });

      it('Changing value should provide state as having value, being dirty, and having focus', () => {
        expect(selected).toHaveTextContent(`Selected: No`);
        expect(focused).toHaveTextContent(`Focused: Yes`);
        expect(input).toHaveValue('foo');
      });

      it('Selecting input trigger a focus, but not be selected since we are instructing it not to', () => {
        fireEvent.select(input);
        expect(selected).toHaveTextContent(`Selected: No`);
        expect(focused).toHaveTextContent(`Focused: Yes`);
        expect(input).toHaveValue('foo');
      });

      it('Clearing value and blurring an element should change focus/select to false', () => {
        fireEvent.select(input);
        input.value = '';
        fireEvent.blur(input);
        expect(selected).toHaveTextContent(`Selected: No`);
        expect(focused).toHaveTextContent(`Focused: No`);
        expect(input).toHaveValue('');
      });
    });
  });

  describe('<FocusExample focus={true} />', () => {
    beforeEach(() => {
      let { getByText, getByTestId } = render(<FocusExample focus={true} />);
      initializeElements(getByText, getByTestId);
    });

    it('Should match snapshot', () => {
      expect(<FocusExample focus={true} />).toMatchSnapshot();
    });

    it('Should have value and input should have focus', () => {
      expect(focused).toHaveTextContent(`Focused: Yes`);
      expect(selected).toHaveTextContent(`Selected: No`);
      expect(input).toHaveValue('');
    });
  });

  describe('<FocusExample value="foo" focus={true} select={true} />', () => {
    beforeEach(() => {
      let { getByText, getByTestId } = render(
        <FocusExample value="foo" focus={true} select={true} />
      );
      initializeElements(getByText, getByTestId);
    });

    it('Should match snapshot', () => {
      expect(
        <FocusExample value="foo" focus={true} select={true} />
      ).toMatchSnapshot();
    });

    it('Should have value, focus, and value selected', () => {
      expect(focused).toHaveTextContent(`Focused: Yes`);
      expect(selected).toHaveTextContent(`Selected: Yes`);
      expect(input).toHaveValue('foo');
    });

    it('Should lose focus and deselect when blurring out of element', () => {
      fireEvent.blur(input);
      expect(focused).toHaveTextContent(`Focused: No`);
      expect(selected).toHaveTextContent(`Selected: No`);
      expect(input).toHaveValue('foo');
    });
  });
});
