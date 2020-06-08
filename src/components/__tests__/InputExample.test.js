import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { InputExample } from '../InputExample';

describe('InputExample integration test using the useInput hook', () => {
  let hasValue, dirty, hovered, bgColor, color, focused, selected, input;

  const initializeElements = (getByText, getByTestId) => {
    hasValue = getByText(/has value/i);
    dirty = getByText(/is dirty/i);
    hovered = getByText(/is hovered/i);
    bgColor = getByText(/background color/i);
    color = getByText(/text color/i);
    focused = getByText(/focused/i);
    selected = getByText(/selected/i);
    input = getByTestId('myInput');
  };

  afterEach(() => {
    cleanup();
  });

  describe('<InputExample />', () => {
    beforeEach(() => {
      let { getByText, getByTestId } = render(<InputExample />);
      initializeElements(getByText, getByTestId);
    });

    it('Should match snapshot', () => {
      expect(<InputExample />).toMatchSnapshot();
    });

    describe('Should handle default behaviors', () => {
      it('Should load with default behavior', () => {
        expect(hasValue).toHaveTextContent(`Has Value: No`);
        expect(dirty).toHaveTextContent(`Is Dirty: No`);
        expect(hovered).toHaveTextContent(`Is Hovered: No`);
        expect(bgColor).toHaveTextContent(`Background Color: #FFF`);
        expect(color).toHaveTextContent(`Text Color: #000`);
        expect(focused).toHaveTextContent(`Focused: No`);
        expect(selected).toHaveTextContent(`Selected: No`);
        expect(input).toBeEnabled();
        expect(input).toHaveValue('');
        expect(input).toHaveStyle('background: rgb(255, 255, 255); color: rgb(0, 0, 0);');
      });

      it('Should handle onMouseOver', () => {
        fireEvent.mouseOver(input);
        expect(hasValue).toHaveTextContent(`Has Value: No`);
        expect(dirty).toHaveTextContent(`Is Dirty: No`);
        expect(hovered).toHaveTextContent(`Is Hovered: Yes`);
        expect(bgColor).toHaveTextContent(`Background Color: #EEE`);
        expect(color).toHaveTextContent(`Text Color: #000`);
        expect(selected).toHaveTextContent(`Selected: No`);
        expect(focused).toHaveTextContent(`Focused: No`);
        expect(input).toBeEnabled();
        expect(input).toHaveValue('');
        expect(input).toHaveStyle('background: rgb(238, 238, 238); color: rgb(0, 0, 0);');
      });

      it('Should handle onMouseOut', () => {
        fireEvent.mouseOut(input);
        expect(hasValue).toHaveTextContent(`Has Value: No`);
        expect(dirty).toHaveTextContent(`Is Dirty: No`);
        expect(hovered).toHaveTextContent(`Is Hovered: No`);
        expect(bgColor).toHaveTextContent(`Background Color: #FFF`);
        expect(color).toHaveTextContent(`Text Color: #000`);
        expect(selected).toHaveTextContent(`Selected: No`);
        expect(focused).toHaveTextContent(`Focused: No`);
        expect(input).toBeEnabled();
        expect(input).toHaveValue('');
        expect(input).toHaveStyle('background: rgb(255, 255, 255); color: rgb(0, 0, 0);');
      });

      it('Should handle setting focus on input without value for component', () => {
        fireEvent.focus(input);
        expect(hasValue).toHaveTextContent(`Has Value: No`);
        expect(dirty).toHaveTextContent(`Is Dirty: No`);
        expect(hovered).toHaveTextContent(`Is Hovered: No`);
        expect(bgColor).toHaveTextContent(`Background Color: #FFF`);
        expect(color).toHaveTextContent(`Text Color: #000`);
        expect(selected).toHaveTextContent(`Selected: No`);
        expect(focused).toHaveTextContent(`Focused: Yes`);
        expect(input).toBeEnabled();
        expect(input).toHaveValue('');
        expect(input).toHaveStyle('background: rgb(255, 255, 255); color: rgb(0, 0, 0);');
      });
    });

    describe('No props passed to component, but we change input value and test behaviorsu', () => {
      beforeEach(() => {
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: 'foo' } });
      });

      it('Changing value should provide state as having value, being dirty, and having focus', () => {
        expect(hasValue).toHaveTextContent(`Has Value: Yes`);
        expect(dirty).toHaveTextContent(`Is Dirty: Yes`);
        expect(hovered).toHaveTextContent(`Is Hovered: No`);
        expect(bgColor).toHaveTextContent(`Background Color: #FFF`);
        expect(color).toHaveTextContent(`Text Color: #000`);
        expect(selected).toHaveTextContent(`Selected: No`);
        expect(focused).toHaveTextContent(`Focused: Yes`);
        expect(input).toBeEnabled();
        expect(input).toHaveValue('foo');
        expect(input).toHaveStyle('background: rgb(255, 255, 255); color: rgb(0, 0, 0);');
      });

      it('Selecting input value should provide state as having value, being dirty, and having focus, but not be selected since we are instructing it not to', () => {
        fireEvent.select(input);
        expect(hasValue).toHaveTextContent(`Has Value: Yes`);
        expect(dirty).toHaveTextContent(`Is Dirty: Yes`);
        expect(hovered).toHaveTextContent(`Is Hovered: No`);
        expect(bgColor).toHaveTextContent(`Background Color: #FFF`);
        expect(color).toHaveTextContent(`Text Color: #000`);
        expect(selected).toHaveTextContent(`Selected: No`);
        expect(focused).toHaveTextContent(`Focused: Yes`);
        expect(input).toBeEnabled();
        expect(input).toHaveValue('foo');
        expect(input).toHaveStyle('background: rgb(255, 255, 255); color: rgb(0, 0, 0);');
      });

      it('Should not be considered Is Dirty when input value is changed back to the initial value', () => {
        fireEvent.change(input, { target: { value: '' } });
        expect(hasValue).toHaveTextContent(`Has Value: No`);
        expect(dirty).toHaveTextContent(`Is Dirty: No`);
        expect(hovered).toHaveTextContent(`Is Hovered: No`);
        expect(bgColor).toHaveTextContent(`Background Color: #FFF`);
        expect(color).toHaveTextContent(`Text Color: #000`);
        expect(selected).toHaveTextContent(`Selected: No`);
        expect(focused).toHaveTextContent(`Focused: Yes`);
        expect(input).toBeEnabled();
        expect(input).toHaveValue('');
        expect(input).toHaveStyle('background: rgb(255, 255, 255); color: rgb(0, 0, 0);');
      });
    });
  });

  describe('<InputExample value="foo" />', () => {
    beforeEach(() => {
      let { getByText, getByTestId } = render(<InputExample value="foo" />);
      initializeElements(getByText, getByTestId);
    });

    it('Should match snapshot', () => {
      expect(<InputExample value="foo" />).toMatchSnapshot();
    });

    it('Should have value without being focused on', () => {
      expect(hasValue).toHaveTextContent(`Has Value: Yes`);
      expect(dirty).toHaveTextContent(`Is Dirty: No`);
      expect(hovered).toHaveTextContent(`Is Hovered: No`);
      expect(bgColor).toHaveTextContent(`Background Color: #FFF`);
      expect(color).toHaveTextContent(`Text Color: #000`);
      expect(focused).toHaveTextContent(`Focused: No`);
      expect(selected).toHaveTextContent(`Selected: No`);
      expect(input).toBeEnabled();
      expect(input).toHaveValue('foo');
      expect(input).toHaveStyle('background: rgb(255, 255, 255); color: rgb(0, 0, 0);');
    });
  });

  // NOTE: When setting focus={true}, this is just telling the hook that we want to set focus into the input on render. If set to false, this doesn't prevent the focused state of the input to every have focus.
  describe('<InputExample value="foo" focus={true} />', () => {
    beforeEach(() => {
      let { getByText, getByTestId } = render(<InputExample value="foo" focus={true} />);
      initializeElements(getByText, getByTestId);
    });

    it('Should match snapshot', () => {
      expect(<InputExample value="foo" focus={true} />).toMatchSnapshot();
    });

    it('Should have value and input should have focus', () => {
      expect(hasValue).toHaveTextContent(`Has Value: Yes`);
      expect(dirty).toHaveTextContent(`Is Dirty: No`);
      expect(hovered).toHaveTextContent(`Is Hovered: No`);
      expect(bgColor).toHaveTextContent(`Background Color: #FFF`);
      expect(color).toHaveTextContent(`Text Color: #000`);
      expect(focused).toHaveTextContent(`Focused: Yes`);
      expect(selected).toHaveTextContent(`Selected: No`);
      expect(input).toBeEnabled();
      expect(input).toHaveValue('foo');
      expect(input).toHaveStyle('background: rgb(255, 255, 255); color: rgb(0, 0, 0);');
    });
  });

  // NOTE: setting select={true}, this is telling the hook that we want to have the value to be selected whenever we set focus into the input
  describe('<InputExample value="foo" focus={true} select={true} />', () => {
    beforeEach(() => {
      let { getByText, getByTestId } = render(
        <InputExample value="foo" focus={true} select={true} />
      );
      initializeElements(getByText, getByTestId);
    });

    it('Should match snapshot', () => {
      expect(<InputExample value="foo" focus={true} select={true} />).toMatchSnapshot();
    });

    it('Should have value, focus, and value selected', () => {
      fireEvent.select(input);
      expect(hasValue).toHaveTextContent(`Has Value: Yes`);
      expect(dirty).toHaveTextContent(`Is Dirty: No`);
      expect(hovered).toHaveTextContent(`Is Hovered: No`);
      expect(bgColor).toHaveTextContent(`Background Color: #FFF`);
      expect(color).toHaveTextContent(`Text Color: #000`);
      expect(focused).toHaveTextContent(`Focused: Yes`);
      expect(selected).toHaveTextContent(`Selected: Yes`);
      expect(input).toBeEnabled();
      expect(input).toHaveValue('foo');
      expect(input).toHaveStyle('background: rgb(255, 255, 255); color: rgb(0, 0, 0);');
    });
  });

  describe('<InputExample value="foo" focus={false} select={true} />', () => {
    beforeEach(() => {
      let { getByText, getByTestId } = render(
        <InputExample value="foo" focus={false} select={true} />
      );
      initializeElements(getByText, getByTestId);
    });

    it('Should match snapshot', () => {
      expect(<InputExample value="foo" focus={false} select={true} />).toMatchSnapshot();
    });

    it('Should have value, focus, and value selected', () => {
      fireEvent.select(input);
      expect(hasValue).toHaveTextContent(`Has Value: Yes`);
      expect(dirty).toHaveTextContent(`Is Dirty: No`);
      expect(hovered).toHaveTextContent(`Is Hovered: No`);
      expect(bgColor).toHaveTextContent(`Background Color: #FFF`);
      expect(color).toHaveTextContent(`Text Color: #000`);
      expect(focused).toHaveTextContent(`Focused: Yes`);
      expect(selected).toHaveTextContent(`Selected: Yes`);
      expect(input).toBeEnabled();
      expect(input).toHaveValue('foo');
      expect(input).toHaveStyle('background: rgb(255, 255, 255); color: rgb(0, 0, 0);');
    });
  });

  describe('<InputExample value="foo" onChange={handleChange} />', () => {
    const handleChange = jest.fn();

    beforeEach(() => {
      let { getByText, getByTestId } = render(<InputExample value="foo" onChange={handleChange} />);
      initializeElements(getByText, getByTestId);
    });

    it('Should match snapshot', () => {
      expect(<InputExample value="foo" onChange={handleChange} />).toMatchSnapshot();
    });

    it('Should have value and when changing it should indicate that it is dirty, has focus, and called the onChange callback event handler', () => {
      expect(hasValue).toHaveTextContent(`Has Value: Yes`);
      expect(dirty).toHaveTextContent(`Is Dirty: No`);
      expect(hovered).toHaveTextContent(`Is Hovered: No`);
      expect(bgColor).toHaveTextContent(`Background Color: #FFF`);
      expect(color).toHaveTextContent(`Text Color: #000`);
      expect(focused).toHaveTextContent(`Focused: No`);
      expect(selected).toHaveTextContent(`Selected: No`);
      expect(input).toBeEnabled();
      expect(input).toHaveValue('foo');
      expect(input).toHaveStyle('background: rgb(255, 255, 255); color: rgb(0, 0, 0);');

      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'foobar' } });

      expect(hasValue).toHaveTextContent(`Has Value: Yes`);
      expect(dirty).toHaveTextContent(`Is Dirty: Yes`);
      expect(hovered).toHaveTextContent(`Is Hovered: No`);
      expect(bgColor).toHaveTextContent(`Background Color: #FFF`);
      expect(color).toHaveTextContent(`Text Color: #000`);
      expect(focused).toHaveTextContent(`Focused: Yes`);
      expect(selected).toHaveTextContent(`Selected: No`);
      expect(input).toBeEnabled();
      expect(input).toHaveValue('foobar');
      expect(input).toHaveStyle('background: rgb(255, 255, 255); color: rgb(0, 0, 0);');
      expect(handleChange).toBeCalledTimes(1);
    });
  });
});
