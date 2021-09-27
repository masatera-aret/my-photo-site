import React, { useContext } from "react";
import { TestCount } from "./Test";

export default function Test2() {
  const { count, setCount } = useContext(TestCount);
  return (
    <>
      <div className={` peer bg-gradient-to-r from-blue-300 to-red-200 `}>
        これはテスト2です
      </div>
      <button
        className={`peer-hover:text-red-300 duration-300`}
        onClick={() => setCount(count + 1)}
      >
        ボタン
      </button>
    </>
  );
}
