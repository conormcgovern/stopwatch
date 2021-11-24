import { useEffect, useReducer } from "react";

function useStateMachine(config) {
  const getNextEvents = (stateName) => {
    return Object.keys(config.states[stateName].transitions);
  };
  const initialState = {
    currentState: config.initial,
    nextEvents: getNextEvents(config.initial),
  };
  const [state, dispatch] = useReducer((state, event) => {
    const currentStateNode = config.states[state.currentState];
    const nextState = currentStateNode.transitions[event];
    if (nextState) {
      return {
        currentState: nextState,
        nextEvents: getNextEvents(nextState),
      };
    }
    return state;
  }, initialState);
  useEffect(() => {
    config.states[state.currentState]?.onEntry?.();
  }, [state]);
  return [state, dispatch];
}

export default useStateMachine;
