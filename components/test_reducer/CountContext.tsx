import { useContext, createContext, useState, useReducer } from "react";

const CountContext = createContext(null);

export function useCountContext() {
  return useContext(CountContext);
}

export const CountProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const valueCount = {
    count,
    setCount,
  };
  return (
    <CountContext.Provider value={valueCount}>{children}</CountContext.Provider>
  );
};
