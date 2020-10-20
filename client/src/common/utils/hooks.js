import { useEffect, useRef } from 'react';

const useUpdateEffect = (effect, dependencies) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    } else {
      effect();
    }
  }, dependencies);
};

export { useUpdateEffect };
