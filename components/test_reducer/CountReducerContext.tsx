import React, { createContext, useContext, useReducer } from "react";

const CountReducerContext = createContext(null);

export function useCountReducerContext() {
  return useContext(CountReducerContext);
}

const inisialState = {
  totalCount: 0,
  countOne: 0,
  countTwo: 0,
};

export type InisialState = typeof inisialState;

type Action = {
  type: string;
  payload?: any;
};

function reducer(state: InisialState, action: Action) {
  switch (action.type) {
    case "incrementOne":
      return {
        ...state,
        countOne: state.countOne + 1,
        totalCount: state.totalCount + 1,
      };
    case "decrementOne":
      if (state.countOne <= 0) return { ...state };
      return {
        ...state,
        countOne: state.countOne - 1,
        totalCount: state.totalCount - 1,
      };
    case "incrementTwo":
      return {
        ...state,
        countTwo: state.countTwo + 1,
        totalCount: state.totalCount + 1,
      };
    case "decrementTwo":
      if (state.countTwo <= 0) return { ...state };
      return {
        ...state,
        countTwo: state.countTwo - 1,
        totalCount: state.totalCount - 1,
      };
    default:
      return state;
  }
}

export const CountReducerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, inisialState);
  const appState = { state, dispatch };
  return (
    <CountReducerContext.Provider value={appState}>
      {children}
    </CountReducerContext.Provider>
  );
};
