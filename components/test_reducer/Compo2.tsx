import React from "react";
import { useCountReducerContext, InisialState } from "./CountReducerContext";
import Compo3 from "./Compo3";

type State = {
  state: InisialState;
  dispatch: React.Dispatch<any>;
};

const Compo2 = () => {
  const { state, dispatch }: State = useCountReducerContext();
  return (
    <div className={`bg-green-500 p-5`}>
      <h1>Compo2</h1>
      <p>カウント:{state.countOne}</p>
      <button
        onClick={() => dispatch({ type: "incrementOne" })}
        className={`bg-pink-600 text-white rounded p-2`}
      >
        Up
      </button>
      <button
        onClick={() => dispatch({ type: "decrementOne" })}
        className={`bg-blue-600 text-white rounded p-2`}
      >
        Down
      </button>
      <Compo3 />
    </div>
  );
};

export default Compo2;
