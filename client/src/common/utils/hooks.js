import { useEffect, useRef } from 'react';

const useConst = (initialValue) => {
  const ref = useRef();
  if (ref.current === undefined) {
    ref.current = {
      value: typeof initialValue === 'function' ? initialValue() : initialValue,
    };
  }
  return ref.current.value;
};

const useUpdateEffect = (effect, dependencies) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    } else {
      effect();
    }
  }, [dependencies, effect]);
};

export { useConst, useUpdateEffect };
