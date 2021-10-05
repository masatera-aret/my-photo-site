import React, { createContext, useState, useReducer } from "react";
import Test2 from "./Test2";

export const TestCountContext = createContext(null);

export default function Test() {
  const [counter, setCounter] = useState(0);
  const contextValue = {
    counter,
    setCounter,
  };
  return (
    <div className={`bg-red-200 p-5`}>
      <div>これはテストです</div>
      <p>counter:{counter}</p>
      <TestCountContext.Provider value={contextValue}>
        <Test2 />
      </TestCountContext.Provider>
    </div>
  );
}
