import { useState } from 'react';

export const useFocusState = (initial = false) => {
  const [focused, set] = useState(initial);
  return {
    focused,
    bind: {
      onFocus: () => set(true),
      onBlur: () => set(false),
    },
  };
};
