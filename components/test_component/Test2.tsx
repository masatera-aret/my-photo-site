import React, { useContext } from "react";
import { TestCountContext } from "./Test";

export default function Test2() {
  const { counter, setCounter } = useContext(TestCountContext);

  return (
    <>
      <div className={`bg-yellow-300`}>
        <h1>これはTest2の中のuseReducerを使ったテストです</h1>

        <button
          onClick={() => setCounter(counter + 1)}
          className={`bg-blue-600 text-white rounded px-3 py-1 m-3`}
        >
          up
        </button>
        <button
          onClick={() => setCounter(counter - 1)}
          className={`bg-blue-600 text-white rounded px-3 py-1`}
        >
          down
        </button>
      </div>
    </>
  );
}
