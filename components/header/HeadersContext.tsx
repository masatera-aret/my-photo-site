import React, { useContext, createContext, useReducer } from "react";

const HeadersStateContext = createContext(null);

export const useHeadersContext = () => {
  return useContext(HeadersStateContext);
};

const initialState = {
  isModalActive: false,
};

export type InitialState = typeof initialState;

type Action = {
  type: string;
};

export function reducer(state: InitialState, action: Action) {
  switch (action.type) {
    case "active":
      return { ...state, isModalActive: (state.isModalActive = true) };
    case "inactive":
      return { ...state, isModalActive: (state.isModalActive = false) };
    default:
      throw new Error("入力ミス");
  }
}

export const HeadersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const valueState = { state, dispatch };

  return (
    <HeadersStateContext.Provider value={valueState}>
      {children}
    </HeadersStateContext.Provider>
  );
};
