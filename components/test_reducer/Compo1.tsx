import React from "react";
import Compo2 from "./Compo2";
import { useCountReducerContext, InisialState } from "./CountReducerContext";

type State = {
  state: InisialState;
};

const Compo1 = () => {
  const { state }: State = useCountReducerContext();
  return (
    <div className={`bg-blue-500 p-5`}>
      <h1>Compo1</h1>
      <p>総カウント数：{state.totalCount}</p>
      <Compo2 />
    </div>
  );
};

export default Compo1;
