import { useEffect } from 'react';
import Animated from 'react-native-reanimated';

import { useConst, useValue } from './hooks';

const { add, block, cond, Clock, neq, not, set, startClock, stopClock, timing, Value } = Animated;

const withTransition = (value, timingConfig) => {
  const init = new Value(0);
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    duration: 150,
    toValue: new Value(0),
    easing: (v) => add(v, 0),
    ...timingConfig,
  };

  return block([
    cond(not(init), [set(init, 1), set(state.position, value)]),
    cond(neq(config.toValue, value), [
      set(state.frameTime, 0),
      set(state.time, 0),
      set(state.finished, 0),
      set(config.toValue, value),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
};

const useTransition = (state, config = {}) => {
  const value = useValue(0);

  useEffect(() => {
    value.setValue(state ? 1 : 0);
  }, [value, state]);

  const transition = useConst(() => withTransition(value, config));
  return transition;
};

export { withTransition, useTransition };
