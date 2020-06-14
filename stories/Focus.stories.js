import React from 'react';

import { action } from '@storybook/addon-actions';
import { FocusExample } from '../src/components/FocusExample';

export default {
  title: 'useFocus',
  component: FocusExample,
};

export const InputFocusedAndSelected = () => (
  <FocusExample value="testing" focus={true} select={true} />
);
export const InputSelected = () => <FocusExample value="" focus={false} select={true} />;

InputFocusedAndSelected.story = {
  name: 'Input Focused and Selected',
};
InputSelected.story = {
  name: 'Input Selected, but not Focused',
};
