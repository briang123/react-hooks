import { useRef, useEffect } from 'react';

export const useSyncedRef = (ref) => {
  // create a new ref
  const innerRef = useRef();

  // keep both refs in sync
  useEffect(() => {
    // handle no ref... ^_^U
    if (!ref) return;
    // console.log('useSyncedRef', ref);

    // handle callback refs
    if (typeof ref === 'function') {
      ref(innerRef.current);
    }
    // handle object refs
    else {
      ref.current = innerRef.current;
    }
  });

  // return the new ref
  return innerRef;
};
