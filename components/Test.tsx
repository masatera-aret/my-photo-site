import React, { createContext, useState } from "react";
import Test2 from "./Test2";

export const TestCount = createContext(null);
export default function Test() {
  const [count, setCount] = useState(100);
  const value = { count, setCount };
  return (
    <div className={`bg-red-200 p-5`}>
      <div>これはテストです</div>
      <p>{count}</p>
      <TestCount.Provider value={value}>
        <Test2 />
      </TestCount.Provider>
    </div>
  );
}
